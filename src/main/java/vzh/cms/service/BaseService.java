package vzh.cms.service;

import vzh.cms.model.Tag;
import vzh.cms.model.Tag_;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import java.util.Optional;

/**
 * @author Viktar Zhyhunou
 */
abstract public class BaseService {

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

    protected static Predicate active(CriteriaBuilder b, Path<Tag> tag) {
        return b.and(
                b.or(b.isNull(tag.get(Tag_.start)), b.greaterThan(b.currentTimestamp(), tag.get(Tag_.start))),
                b.or(b.isNull(tag.get(Tag_.end)), b.lessThan(b.currentTimestamp(), tag.get(Tag_.end)))
        );
    }
}
