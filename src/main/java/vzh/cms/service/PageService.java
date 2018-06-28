package vzh.cms.service;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vzh.cms.model.Page;
import vzh.cms.model.PageFilter;
import vzh.cms.repository.PageRepository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.MapJoin;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.Optional;

/**
 * @author Viktar Zhyhunou
 */
@Service
public class PageService {

    private PageRepository repository;

    public PageService(PageRepository repository) {
        this.repository = repository;
    }

    public org.springframework.data.domain.Page<Page> list(PageFilter filter, String locale, Pageable pageable) {
        return repository.findAll((root, q, b) -> {
            Predicate predicateId = b.like(root.get("id"), getLikeParam(filter.getId()));
            if (Long.class == q.getResultType())
                return predicateId;
            Predicate predicateLocale = getPredicateLocale(root, b, locale);
            return b.and(predicateId, predicateLocale);
        }, pageable);
    }

    public Page one(String id, String locale) {
        return repository.findOne((root, q, b) -> {
            Predicate predicateId = b.equal(root.get("id"), id);
            Predicate predicateLocale = getPredicateLocale(root, b, locale);
            return b.and(predicateId, predicateLocale);
        });
    }

    private static String getLikeParam(Object field) {
        return Optional.ofNullable(field).map(f -> "%" + f + "%").orElse("%");
    }

    private static Predicate getPredicateLocale(Root<Page> root, CriteriaBuilder b, String locale) {
        Path key = ((MapJoin) root.fetch("properties", JoinType.LEFT)).key();
        return b.or(b.equal(key, locale), b.isNull(key));
    }
}
