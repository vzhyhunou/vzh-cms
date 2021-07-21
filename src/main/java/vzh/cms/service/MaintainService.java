package vzh.cms.service;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.support.Repositories;
import org.springframework.stereotype.Service;
import vzh.cms.model.Item;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;

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
        mapper.addMixIn(Item.class, ItemMixIn.class);
    }

    @SuppressWarnings("unchecked")
    public PagingAndSortingRepository<Item, Object> getRepository(Class<Item> type) {
        return (PagingAndSortingRepository<Item, Object>) repositories.getRepositoryFor(type)
                .orElseThrow(() -> new RuntimeException(String.format("Repository for %s not found", type)));
    }

    public Item read(File file) throws IOException {
        log.info("Read: {}", file);
        return mapper.readValue(file, Wrapper.class).getItem();
    }

    @SuppressWarnings("ResultOfMethodCallIgnored")
    public void write(File file, Item item) throws IOException {
        log.info("Write: {}", file);
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

    private interface ItemMixIn {
        @JsonIgnore
        Object[] getParents();
    }
}
