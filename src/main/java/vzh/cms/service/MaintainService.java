package vzh.cms.service;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.support.Repositories;
import org.springframework.stereotype.Service;
import vzh.cms.model.Item;

import javax.annotation.PostConstruct;
import javax.persistence.Id;
import java.io.File;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.Arrays;

/**
 * @author Viktar Zhyhunou
 */
@Service
@Log4j2
@RequiredArgsConstructor
public class MaintainService {

    private final ListableBeanFactory factory;

    private final FileService fileService;

    private final ObjectMapper mapper;

    private Repositories repositories;

    @PostConstruct
    private void postConstruct() {
        repositories = new Repositories(factory);
    }

    @SuppressWarnings("unchecked")
    public PagingAndSortingRepository<Item, ?> getRepository(Class<Item> type) {
        return (PagingAndSortingRepository<Item, ?>) repositories.getRepositoryFor(type)
                .orElseThrow(() -> new RuntimeException(String.format("Repository for %s not found", type)));
    }

    public Item read(File file, boolean full) throws Exception {
        log.info("Read: {}", file);
        Item item = mapper.readValue(file, Wrapper.class).getItem();
        if (!full) {
            return getInstanceWithId(item);
        }
        fileService.save(item);
        return item;
    }

    @SuppressWarnings("ResultOfMethodCallIgnored")
    public void write(File file, Item item) throws IOException {
        log.info("Write: {}", file);
        fileService.collect(item, true);
        file.getParentFile().mkdirs();
        Wrapper wrapper = new Wrapper();
        wrapper.setItem(item);
        mapper.writeValue(file, wrapper);
    }

    @Data
    private static class Wrapper {
        @JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, include = JsonTypeInfo.As.EXTERNAL_PROPERTY)
        private Item item;
    }

    @SuppressWarnings("unchecked")
    private static Item getInstanceWithId(Item item) throws Exception {
        Item instance = ((Class<Item>) item.getClass()).newInstance();
        BeanWrapperImpl src = new BeanWrapperImpl(item);
        BeanWrapperImpl dst = new BeanWrapperImpl(instance);
        Arrays.stream(item.getClass().getDeclaredFields())
                .filter(f -> Arrays.stream(f.getDeclaredAnnotations()).anyMatch(a -> a instanceof Id))
                .map(Field::getName)
                .forEach(n -> dst.setPropertyValue(n, src.getPropertyValue(n)));
        return instance;
    }
}
