package vzh.cms.service;

import vzh.cms.model.Content;
import vzh.cms.model.Tag;
import vzh.cms.model.Tag_;
import vzh.cms.repository.Repository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import java.io.Serializable;

/**
 * @author Viktar Zhyhunou
 */
abstract public class ItemService<T extends Content, ID extends Serializable, R extends Repository<T, ID>> extends BaseService {

    protected R repository;

    protected ItemService(R repository) {
        this.repository = repository;
    }

    protected static Predicate active(CriteriaBuilder b, Path<Tag> tag) {
        return active(b, tag.get(Tag_.start), tag.get(Tag_.end));
    }
}
