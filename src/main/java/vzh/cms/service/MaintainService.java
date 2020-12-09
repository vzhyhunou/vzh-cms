package vzh.cms.service;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.support.Repositories;
import org.springframework.stereotype.Service;
import vzh.cms.model.Item;

import java.io.File;
import java.io.IOException;

/**
 * @author Viktar Zhyhunou
 */
@Service
@Log4j2
public class MaintainService {

    private Repositories repositories;

    private FileService fileService;

    private ObjectMapper mapper;

    public MaintainService(ListableBeanFactory factory, FileService fileService, ObjectMapper mapper) {
        repositories = new Repositories(factory);
        this.fileService = fileService;
        this.mapper = mapper;
    }

    @SuppressWarnings("unchecked")
    public PagingAndSortingRepository<Item<?>, ?> getRepository(Class<?> type) {
        return (PagingAndSortingRepository<Item<?>, ?>) repositories.getRepositoryFor(type)
                .orElseThrow(() -> new RuntimeException(String.format("Repository for %s not found", type)));
    }

    public Item<?> read(File file) throws IOException {
        log.info("Read: {}", file);
        Item<?> item = mapper.readValue(file, Wrapper.class).getItem();
        fileService.save(item);
        return item;
    }

    @SuppressWarnings("ResultOfMethodCallIgnored")
    public void write(File file, Item<?> item) throws IOException {
        log.info("Write: {}", file);
        item.getFiles().addAll(fileService.collect(item, true));
        file.getParentFile().mkdirs();
        Wrapper wrapper = new Wrapper();
        wrapper.setItem(item);
        mapper.writeValue(file, wrapper);
    }

    @Data
    private static class Wrapper {
        @JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, include = JsonTypeInfo.As.EXTERNAL_PROPERTY)
        private Item<?> item;
    }
}
