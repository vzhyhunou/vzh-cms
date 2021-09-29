package vzh.cms.repository;

import vzh.cms.model.Tagged;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Predicate;

/**
 * @author Viktar Zhyhunou
 */
public interface CustomizedTaggedRepository<T extends Tagged, ID> extends CustomizedRepository<T, ID> {

    Predicate filterAny(Expression<T> root, CriteriaQuery<?> q, CriteriaBuilder b, String... names);

    Predicate filterAll(Expression<T> root, CriteriaQuery<?> q, CriteriaBuilder b, String... names);
}
