package vzh.cms.service;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import java.util.Date;
import java.util.Optional;

/**
 * @author Viktar Zhyhunou
 */
abstract class BaseService {

    protected static Predicate equal(CriteriaBuilder b, Expression<?> expression, Object field) {
        return Optional.ofNullable(field)
                .map(f -> b.equal(expression, f))
                .orElse(null);
    }

    protected static Predicate like(CriteriaBuilder b, Expression<String> expression, String field) {
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
}
