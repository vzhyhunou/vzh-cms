package vzh.cms.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;
import vzh.cms.repository.BaseRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @author Viktar Zhyhunou
 */
@RequiredArgsConstructor
public abstract class BaseService<T, ID> extends AbstractService {

    protected final BaseRepository<T, ID> repository;

    private SpelAwareProxyProjectionFactory factory;

    @Autowired
    public void setBeanFactory(BeanFactory beanFactory) {
        factory = new SpelAwareProxyProjectionFactory();
        factory.setBeanFactory(beanFactory);
    }

    public <E> Optional<E> findById(ID id, Class<E> type) {
        return repository.findById(id).map(e -> factory.createProjection(type, e));
    }

    public <E> Optional<E> findOne(Specification<T> specification, Class<E> type) {
        return repository.findOne(specification).map(e -> factory.createProjection(type, e));
    }

    public <E> List<E> findAll(Specification<T> specification, Class<E> type) {
        return repository.findAll(specification).stream().map(e -> factory.createProjection(type, e)).collect(Collectors.toList());
    }

    public <E> Page<E> findAll(Specification<T> specification, Class<E> type, Pageable pageable) {
        return repository.findAll(specification, pageable).map(e -> factory.createProjection(type, e));
    }
}
