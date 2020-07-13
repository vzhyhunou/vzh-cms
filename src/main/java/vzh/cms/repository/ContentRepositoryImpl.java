package vzh.cms.repository;

import org.springframework.context.i18n.LocaleContextHolder;
import vzh.cms.model.Item;
import vzh.cms.model.Item_;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.MapJoin;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;
import java.io.Serializable;
import java.util.List;
import java.util.Optional;

/**
 * @author Viktar Zhyhunou
 */
public abstract class ContentRepositoryImpl<T extends Item, ID extends Serializable> extends ItemRepositoryImpl<T, ID> implements CustomizedContentRepository<T, ID> {

    private static final String ID = "id";
    private static final String PROPERTIES = "properties";

    protected ContentRepositoryImpl(Class<T> domainClass, EntityManager manager) {
        super(domainClass, manager);
    }

    @Override
    public <E> Optional<E> contentByActiveTags(ID id, Class<E> type, Object... names) {
        return findOne((root, q, b) -> {
            MapJoin<?, ?, ?> properties = (MapJoin<?, ?, ?>) root.fetch(PROPERTIES);
            return b.and(
                    filter(root, q, b, b.equal(root.get(ID), id), names),
                    b.equal(properties.key(), LocaleContextHolder.getLocale().getLanguage())
            );
        }, type);
    }

    @Override
    public <E> List<E> contentsByActiveTags(Class<E> type, String order, Object... names) {
        return findAll((root, q, b) -> {
            MapJoin<?, ?, ?> properties = (MapJoin<?, ?, ?>) root.fetch(PROPERTIES);
            q.orderBy(b.asc(properties.value().get(order)));
            return b.and(
                    filter(root, q, b, b.and(), names),
                    b.equal(properties.key(), LocaleContextHolder.getLocale().getLanguage())
            );
        }, type);
    }

    private Predicate filter(Root<T> root, CriteriaQuery<?> q, CriteriaBuilder b, Predicate p, Object... names) {
        if (names.length == 0) {
            return p;
        }
        Subquery<T> subquery = q.subquery(getDomainClass());
        Root<T> r = subquery.from(getDomainClass());
        return root.in(
                subquery.select(r)
                        .where(b.and(
                                p,
                                active(b, r.join(Item_.TAGS), names)
                        ))
                        .groupBy(r.get(ID))
                        .having(b.equal(b.count(r.get(ID)), names.length))
        );
    }
}
