package vzh.cms.repository;

import vzh.cms.model.Item;
import vzh.cms.model.Tag;
import vzh.cms.model.Tag_;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import java.io.Serializable;

/**
 * @author Viktar Zhyhunou
 */
abstract class ItemRepositoryImpl<T extends Item, ID extends Serializable> extends RepositoryImpl<T, ID> {

    protected ItemRepositoryImpl(Class<T> domainClass, EntityManager manager) {
        super(domainClass, manager);
    }

    protected static Predicate active(CriteriaBuilder b, Path<Tag> tag) {
        return active(b, tag.get(Tag_.start), tag.get(Tag_.end));
    }
}
