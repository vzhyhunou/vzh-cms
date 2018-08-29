package vzh.cms.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;

import javax.persistence.EntityManager;
import java.io.Serializable;
import java.util.function.Consumer;

/**
 * @author Viktar Zhyhunou
 */
public class RepositoryImpl<T, ID extends Serializable> extends SimpleJpaRepository<T, ID> implements Repository<T> {

    private final ProjectionFactory factory = new SpelAwareProxyProjectionFactory();

    public RepositoryImpl(Class<T> domainClass, EntityManager manager) {
        super(domainClass, manager);
    }

    @Override
    public <E> Page<E> findAll(Specification<T> specification, Class<E> type, Pageable pageable) {
        return readPage(specification, pageable).map(e -> factory.createProjection(type, e));
    }

    @Override
    public Page<T> findAll(Specification<T> specification, Consumer<T> consumer, Pageable pageable) {
        return readPage(specification, pageable).map(e -> {
            consumer.accept(e);
            return e;
        });
    }

    @Override
    public <E> Page<E> findAll(Specification<T> specification, Class<E> type, Consumer<T> consumer, Pageable pageable) {
        return readPage(specification, pageable).map(e -> {
            consumer.accept(e);
            return factory.createProjection(type, e);
        });
    }

    private Page<T> readPage(Specification<T> specification, Pageable pageable) {
        return readPage(getQuery(specification, pageable), getDomainClass(), pageable, specification);
    }
}
