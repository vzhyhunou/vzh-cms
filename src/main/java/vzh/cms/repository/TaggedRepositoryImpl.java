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

/**
 * @author Viktar Zhyhunou
 */
public abstract class TaggedRepositoryImpl<T extends Tagged<ID>, ID extends Serializable> extends RepositoryImpl<T, ID> {

    protected static final String ID = "id";

    protected TaggedRepositoryImpl(Class<T> domainClass, EntityManager manager) {
        super(domainClass, manager);
    }

    protected static Predicate active(CriteriaBuilder b, Path<Tag> tag) {
        return active(b, tag.get(Tag_.start), tag.get(Tag_.end));
    }

    protected static Predicate active(CriteriaBuilder b, Path<Tag> tag, Object... names) {
        return b.and(
                tag.get(Tag_.name).in(names),
                active(b, tag)
        );
    }

    protected Predicate filter(Root<T> root, CriteriaQuery<?> q, CriteriaBuilder b, Predicate p, Object... names) {
        if (names.length == 0) {
            return p;
        }
        Subquery<T> subquery = q.subquery(getDomainClass());
        Root<T> r = subquery.from(getDomainClass());
        return root.in(
                subquery.select(r)
                        .where(b.and(
                                p,
                                active(b, r.join(Tagged_.TAGS), names)
                        ))
                        .groupBy(r.get(ID))
                        .having(b.equal(b.count(r.get(ID)), names.length))
        );
    }
}
