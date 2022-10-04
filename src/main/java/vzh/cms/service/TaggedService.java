package vzh.cms.service;

import vzh.cms.model.Tag;
import vzh.cms.model.Tag_;
import vzh.cms.model.Tagged_;
import vzh.cms.repository.BaseRepository;

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
public abstract class TaggedService<T, ID> extends BaseService<T, ID> {

    private final Class<T> domainClass;

    public TaggedService(BaseRepository<T, ID> repository, Class<T> domainClass) {
        super(repository);
        this.domainClass = domainClass;
    }

    protected static Predicate active(CriteriaBuilder b, Path<Tag> tags) {
        return active(b, tags.get(Tag_.start), tags.get(Tag_.end));
    }

    protected static Predicate active(CriteriaBuilder b, Path<Tag> tags, String... names) {
        return b.and(
                tags.get(Tag_.name).in(Arrays.copyOf(names, names.length, Object[].class)),
                active(b, tags)
        );
    }

    public Predicate any(Expression<T> root, CriteriaQuery<?> q, CriteriaBuilder b, String... names) {
        if (names.length == 0) {
            return b.and();
        }
        Subquery<T> subquery = q.subquery(domainClass);
        Root<T> r = subquery.from(domainClass);
        Path<Tag> tags = r.join(Tagged_.TAGS);
        return root.in(subquery.select(r).where(active(b, tags, names)));
    }
}
