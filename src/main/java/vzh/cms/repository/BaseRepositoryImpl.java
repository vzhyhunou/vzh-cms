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
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

/**
 * @author Viktar Zhyhunou
 */
public abstract class BaseRepositoryImpl<T, ID> extends SimpleJpaRepository<T, ID> implements CustomizedRepository<T, ID> {

    private SpelAwareProxyProjectionFactory factory;

    protected BaseRepositoryImpl(Class<T> domainClass, EntityManager em) {
        super(domainClass, em);
    }

    @Autowired
    public void setBeanFactory(BeanFactory beanFactory) {
        factory = new SpelAwareProxyProjectionFactory();
        factory.setBeanFactory(beanFactory);
    }

    public <E> Optional<E> findById(ID id, Class<E> type) {
        return findById(id).map(e -> factory.createProjection(type, e));
    }

    public <E> Optional<E> findOne(Specification<T> specification, Class<E> type) {
        return findOne(specification).map(e -> factory.createProjection(type, e));
    }

    public <E> List<E> findAll(Specification<T> specification, Class<E> type) {
        return findAll(specification).stream().map(e -> factory.createProjection(type, e)).collect(toList());
    }

    public <E> Page<E> findAll(Specification<T> specification, Class<E> type, Pageable pageable) {
        return findAll(specification, pageable).map(e -> factory.createProjection(type, e));
    }

    protected static Predicate equal(CriteriaBuilder b, Expression<?> expression, Object field) {
        return Optional.ofNullable(field)
                .map(f -> b.equal(expression, f))
                .orElse(b.and());
    }

    protected static Predicate contains(CriteriaBuilder b, Expression<String> expression, String field) {
        return contains(b, expression, field, "%%%s%%");
    }

    protected static Predicate contains(CriteriaBuilder b, Expression<String> expression, String field, String format) {
        return Optional.ofNullable(field)
                .map(f -> b.like(b.lower(expression), String.format(format, f.toLowerCase())))
                .orElse(b.and());
    }

    protected static Predicate in(CriteriaBuilder b, Expression<?> expression, Object[] fields) {
        return Optional.ofNullable(fields)
                .map(expression::in)
                .orElse(b.and());
    }

    protected static Predicate isNull(CriteriaBuilder b, Expression<?> expression, Object field) {
        return Optional.ofNullable(field)
                .map(f -> b.isNull(expression))
                .orElse(b.and());
    }

    protected static Predicate active(CriteriaBuilder b, Path<Date> start, Path<Date> end) {
        return b.and(
                b.or(b.isNull(start), b.greaterThan(b.currentTimestamp(), start)),
                b.or(b.isNull(end), b.lessThan(b.currentTimestamp(), end))
        );
    }
}
