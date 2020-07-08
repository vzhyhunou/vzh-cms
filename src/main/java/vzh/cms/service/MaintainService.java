package vzh.cms.service;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.support.Repositories;
import org.springframework.stereotype.Service;
import vzh.cms.model.Storage;

import java.io.File;

/**
 * @author Viktar Zhyhunou
 */
@Service
public class MaintainService {

    private static final Logger LOG = LoggerFactory.getLogger(MaintainService.class);

    private Repositories repositories;

    private FileService fileService;

    private ObjectMapper mapper;

    public MaintainService(ListableBeanFactory factory, FileService fileService, ObjectMapper mapper) {
        repositories = new Repositories(factory);
        this.fileService = fileService;
        this.mapper = mapper;
    }

    @SuppressWarnings("unchecked")
    public CrudRepository<Object, ?> getRepository(Class<?> type) {
        return (CrudRepository<Object, ?>) repositories.getRepositoryFor(type)
                .orElseThrow(() -> new RuntimeException(String.format("Repository for %s not found", type)));
    }

    public Object read(File file) throws Exception {

        LOG.info("Read: {}", file);
        Object entity = mapper.readValue(file, Wrapper.class).getData();
        if (entity instanceof Storage) {
            fileService.save((Storage) entity);
        }
        return entity;
    }

    @SuppressWarnings("ResultOfMethodCallIgnored")
    public void write(File file, Object entity) throws Exception {

        LOG.info("Write: {}", file);
        if (entity instanceof Storage) {
            ((Storage) entity).getFiles().addAll(fileService.collect(entity, true));
        }
        file.getParentFile().mkdirs();
        Wrapper wrapper = new Wrapper();
        wrapper.setData(entity);
        mapper.writeValue(file, wrapper);
    }

    @Data
    private static class Wrapper {

        @JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, include = JsonTypeInfo.As.EXTERNAL_PROPERTY)
        private Object data;
    }
}
