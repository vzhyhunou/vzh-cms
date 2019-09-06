package vzh.cms.repository;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.data.projection.SpelAwareProxyProjectionFactory;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * @author Viktar Zhyhunou
 */
abstract class RepositoryImpl<T, ID extends Serializable> extends SimpleJpaRepository<T, ID> implements CustomizedRepository<T> {

    private final SpelAwareProxyProjectionFactory factory = new SpelAwareProxyProjectionFactory();

    protected RepositoryImpl(Class<T> domainClass, EntityManager manager) {
        super(domainClass, manager);
    }

    @Autowired
    public void setBeanFactory(BeanFactory beanFactory) {
        factory.setBeanFactory(beanFactory);
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

    protected static Predicate equal(CriteriaBuilder b, Expression<?> expression, Object field) {
        return Optional.ofNullable(field)
                .map(f -> b.equal(expression, f))
                .orElse(null);
    }

    protected static Predicate contains(CriteriaBuilder b, Expression<String> expression, String field) {
        return Optional.ofNullable(field)
                .map(f -> b.like(b.lower(expression), String.format("%%%s%%", f.toLowerCase())))
                .orElse(null);
    }

    protected static Predicate in(Expression<?> expression, Object[] fields) {
        return Optional.ofNullable(fields)
                .map(f -> expression.in(fields))
                .orElse(null);
    }

    protected static Predicate active(CriteriaBuilder b, Path<Date> start, Path<Date> end) {
        return b.and(
                b.or(b.isNull(start), b.greaterThan(b.currentTimestamp(), start)),
                b.or(b.isNull(end), b.lessThan(b.currentTimestamp(), end))
        );
    }

    protected static Predicate[] nonNull(Predicate... predicates) {
        return Stream.of(predicates).filter(Objects::nonNull).toArray(Predicate[]::new);
    }
}
