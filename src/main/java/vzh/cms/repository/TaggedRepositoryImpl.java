package vzh.cms.repository;

import vzh.cms.model.Tag;
import vzh.cms.model.Tag_;
import vzh.cms.model.Tagged;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import java.io.Serializable;

/**
 * @author Viktar Zhyhunou
 */
public abstract class TaggedRepositoryImpl<T extends Tagged<ID>, ID extends Serializable> extends RepositoryImpl<T, ID> {

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
}
