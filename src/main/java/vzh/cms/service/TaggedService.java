package vzh.cms.service;

import vzh.cms.model.Tag;
import vzh.cms.model.Tag_;
import vzh.cms.model.Tagged_;
import vzh.cms.repository.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;
import java.util.Arrays;

/**
 * @author Viktar Zhyhunou
 */
public abstract class TaggedService<T, ID> extends Service<T, ID> {

    private static final String ID = "id";

    private final Class<T> domainClass;

    public TaggedService(Repository<T, ID> repository, Class<T> domainClass) {
        super(repository);
        this.domainClass = domainClass;
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

    public Predicate filterAny(Expression<T> root, CriteriaQuery<?> q, CriteriaBuilder b, String... names) {
        if (names.length == 0) {
            return b.and();
        }
        Subquery<T> subquery = q.subquery(domainClass);
        Root<T> r = subquery.from(domainClass);
        return root.in(
                subquery.select(r)
                        .where(active(b, r.join(Tagged_.TAGS), names))
        );
    }

    public Predicate filterAll(Expression<T> root, CriteriaQuery<?> q, CriteriaBuilder b, String... names) {
        if (names.length == 0) {
            return b.and();
        }
        Subquery<T> subquery = q.subquery(domainClass);
        Root<T> r = subquery.from(domainClass);
        return root.in(
                subquery.select(r)
                        .where(active(b, r.join(Tagged_.TAGS), names))
                        .groupBy(r.get(ID))
                        .having(b.equal(b.count(r.get(ID)), names.length))
        );
    }
}
