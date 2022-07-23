package vzh.cms.service;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.introspect.AnnotatedMember;
import com.fasterxml.jackson.databind.introspect.JacksonAnnotationIntrospector;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.hibernate.proxy.HibernateProxy;
import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.data.repository.support.Repositories;
import org.springframework.stereotype.Service;
import vzh.cms.model.ExportIgnore;
import vzh.cms.model.Item;
import vzh.cms.repository.ItemRepository;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

/**
 * @author Viktar Zhyhunou
 */
@Service
@Log4j2
@RequiredArgsConstructor
public class MaintainService {

    private final ListableBeanFactory factory;

    private final ObjectMapper objectMapper;

    private Repositories repositories;

    private ObjectMapper mapper;

    @PostConstruct
    private void postConstruct() {
        repositories = new Repositories(factory);
        mapper = objectMapper.copy();
        mapper.setAnnotationIntrospector(new JacksonAnnotationIntrospector() {
            @Override
            public boolean hasIgnoreMarker(AnnotatedMember m) {
                return super.hasIgnoreMarker(m) || _findAnnotation(m, ExportIgnore.class) != null;
            }
        });
    }

    @SuppressWarnings("unchecked")
    public ItemRepository<Item, Object> getRepository(Item item) {
        return getRepository((Class<Item>) item.getClass());
    }

    @SuppressWarnings("unchecked")
    public ItemRepository<Item, Object> getRepository(Class<Item> type) {
        return (ItemRepository<Item, Object>) repositories.getRepositoryFor(type)
                .orElseThrow(() -> new RuntimeException(String.format("Repository for %s not found", type)));
    }

    public Item read(File file) throws IOException {
        log.debug("Read: {}", file);
        return mapper.readValue(file, Wrapper.class).getItem();
    }

    public void write(File file, Item item) throws IOException {
        log.debug("Write: {}", file);
        Files.createDirectories(file.getParentFile().toPath());
        Wrapper wrapper = new Wrapper();
        wrapper.setItem(implementation(item));
        mapper.writeValue(file, wrapper);
    }

    @Data
    private static class Wrapper {
        @JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, include = JsonTypeInfo.As.EXTERNAL_PROPERTY)
        private Item item;
    }

    private Item implementation(Item item) {
        return item instanceof HibernateProxy
                ? (Item) ((HibernateProxy) item).getHibernateLazyInitializer().getImplementation()
                : item;
    }
}
