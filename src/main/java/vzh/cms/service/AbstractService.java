package vzh.cms.service;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import java.util.Date;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Stream;

/**
 * @author Viktar Zhyhunou
 */
public abstract class AbstractService {

    protected static Predicate equal(CriteriaBuilder b, Expression<?> expression, Object field) {
        return Optional.ofNullable(field)
                .map(f -> b.equal(expression, f))
                .orElse(null);
    }

    protected static Predicate contains(CriteriaBuilder b, Expression<String> expression, String field) {
        return contains(b, expression, field, "%%%s%%");
    }

    protected static Predicate contains(CriteriaBuilder b, Expression<String> expression, String field, String format) {
        return Optional.ofNullable(field)
                .map(f -> b.like(b.lower(expression), String.format(format, f.toLowerCase())))
                .orElse(null);
    }

    protected static Predicate in(Expression<?> expression, Object[] fields) {
        return Optional.ofNullable(fields)
                .map(f -> expression.in(fields))
                .orElse(null);
    }

    protected static Predicate isNull(CriteriaBuilder b, Expression<?> expression, Object field) {
        return Optional.ofNullable(field)
                .map(f -> b.isNull(expression))
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
