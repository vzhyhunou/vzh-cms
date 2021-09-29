package vzh.cms.repository;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @author Viktar Zhyhunou
 */
public abstract class RepositoryImpl<T, ID> extends SimpleJpaRepository<T, ID> implements CustomizedRepository<T, ID> {

    private final SpelAwareProxyProjectionFactory factory = new SpelAwareProxyProjectionFactory();

    protected RepositoryImpl(Class<T> domainClass, EntityManager manager) {
        super(domainClass, manager);
    }

    @Autowired
    public void setBeanFactory(BeanFactory beanFactory) {
        factory.setBeanFactory(beanFactory);
    }

    @Override
    public <E> Optional<E> findById(ID id, Class<E> type) {
        return findById(id).map(e -> factory.createProjection(type, e));
    }

    @Override
    public <E> Optional<E> findOne(Specification<T> specification, Class<E> type) {
        return findOne(specification).map(e -> factory.createProjection(type, e));
    }

    @Override
    public <E> List<E> findAll(Specification<T> specification, Class<E> type) {
        return findAll(specification).stream().map(e -> factory.createProjection(type, e)).collect(Collectors.toList());
    }

    @Override
    public <E> Page<E> findAll(Specification<T> specification, Class<E> type, Pageable pageable) {
        return findAll(specification, pageable).map(e -> factory.createProjection(type, e));
    }
}
