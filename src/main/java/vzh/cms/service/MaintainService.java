package vzh.cms.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.support.Repositories;

import java.io.Serializable;

/**
 * @author Viktar Zhyhunou
 */
abstract class MaintainService {

    @Autowired
    protected FileService fileService;

    @Autowired
    protected ObjectMapper mapper;

    private Repositories repositories;

    @Autowired
    public void setFactory(ListableBeanFactory factory) {
        repositories = new Repositories(factory);
    }

    @SuppressWarnings("unchecked")
    protected <T, ID extends Serializable> CrudRepository<T, ID> repository(Class<T> type) {
        return (CrudRepository<T, ID>) repositories.getRepositoryFor(type)
                .orElseThrow(() -> new RuntimeException(String.format("Repository for %s not found", type)));
    }
}
