package vzh.cms.repository;

import vzh.cms.model.Tag;
import vzh.cms.model.Tag_;
import vzh.cms.model.Tagged;
import vzh.cms.model.Tagged_;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;
import java.io.Serializable;
import java.util.Arrays;

/**
 * @author Viktar Zhyhunou
 */
public abstract class TaggedRepositoryImpl<T extends Tagged, ID extends Serializable> extends RepositoryImpl<T, ID> {

    protected static final String ID = "id";

    protected TaggedRepositoryImpl(Class<T> domainClass, EntityManager manager) {
        super(domainClass, manager);
    }

    protected static Predicate active(CriteriaBuilder b, Path<Tag> tag) {
        return active(b, tag.get(Tag_.start), tag.get(Tag_.end));
    }

    protected static Predicate active(CriteriaBuilder b, Path<Tag> tag, String... names) {
        return b.and(
                tag.get(Tag_.name).in(Arrays.copyOf(names, names.length, Object[].class)),
                active(b, tag)
        );
    }

    protected Predicate filterAny(Root<T> root, CriteriaQuery<?> q, CriteriaBuilder b, String... names) {
        if (names.length == 0) {
            return b.and();
        }
        Subquery<T> subquery = q.subquery(getDomainClass());
        Root<T> r = subquery.from(getDomainClass());
        return root.in(
                subquery.select(r)
                        .where(active(b, r.join(Tagged_.TAGS), names))
        );
    }

    protected Predicate filterAll(Root<T> root, CriteriaQuery<?> q, CriteriaBuilder b, String... names) {
        if (names.length == 0) {
            return b.and();
        }
        Subquery<T> subquery = q.subquery(getDomainClass());
        Root<T> r = subquery.from(getDomainClass());
        return root.in(
                subquery.select(r)
                        .where(active(b, r.join(Tagged_.TAGS), names))
                        .groupBy(r.get(ID))
                        .having(b.equal(b.count(r.get(ID)), names.length))
        );
    }
}
