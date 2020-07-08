package vzh.cms.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.support.Repositories;
import vzh.cms.model.Storage;
import vzh.cms.model.Wrapper;

import java.io.File;

/**
 * @author Viktar Zhyhunou
 */
abstract class MaintainService {

    private static final Logger LOG = LoggerFactory.getLogger(MaintainService.class);

    @Autowired
    private FileService fileService;

    @Autowired
    private ObjectMapper mapper;

    private Repositories repositories;

    @Autowired
    public void setFactory(ListableBeanFactory factory) {
        repositories = new Repositories(factory);
    }

    @SuppressWarnings("unchecked")
    protected CrudRepository<Object, ?> getRepository(Class<?> type) {
        return (CrudRepository<Object, ?>) repositories.getRepositoryFor(type)
                .orElseThrow(() -> new RuntimeException(String.format("Repository for %s not found", type)));
    }

    protected Object read(File file) throws Exception {

        LOG.info("Read: {}", file);
        Object entity = mapper.readValue(file, Wrapper.class).getData();
        if (entity instanceof Storage) {
            fileService.save((Storage) entity);
        }
        return entity;
    }

    @SuppressWarnings("ResultOfMethodCallIgnored")
    protected void write(File file, Object entity) throws Exception {

        LOG.info("Write: {}", file);
        if (entity instanceof Storage) {
            ((Storage) entity).getFiles().addAll(fileService.collect(entity, true));
        }
        file.getParentFile().mkdirs();
        Wrapper wrapper = new Wrapper();
        wrapper.setData(entity);
        mapper.writeValue(file, wrapper);
    }
}
