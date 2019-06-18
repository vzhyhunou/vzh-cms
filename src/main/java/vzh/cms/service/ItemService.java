package vzh.cms.service;

import vzh.cms.model.Item;
import vzh.cms.repository.ItemRepository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Predicate;
import java.sql.Timestamp;
import java.util.Optional;

/**
 * @author Viktar Zhyhunou
 */
abstract class ItemService<I extends Item, T extends ItemRepository<I>> {

    protected T repository;

    protected ItemService(T repository) {
        this.repository = repository;
    }

    protected static Predicate like(CriteriaBuilder b, Expression<String> expression, String field) {
        return Optional.ofNullable(field)
                .map(f -> b.like(b.lower(expression), String.format("%%%s%%", f.toLowerCase())))
                .orElse(null);
    }

    protected static Predicate in(Expression<String[]> expression, Object[] fields) {
        return Optional.ofNullable(fields)
                .map(f -> expression.in(fields))
                .orElse(null);
    }

    protected static Predicate active(CriteriaBuilder b, Expression<Timestamp> start, Expression<Timestamp> end) {
        return b.and(
                b.or(b.isNull(start), b.greaterThan(b.currentTimestamp(), start)),
                b.or(b.isNull(end), b.lessThan(b.currentTimestamp(), end))
        );
    }
}
