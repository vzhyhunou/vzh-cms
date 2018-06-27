package vzh.cms.service;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vzh.cms.model.Page;
import vzh.cms.repository.PageRepository;

import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.MapJoin;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;

/**
 * @author Viktar Zhyhunou
 */
@Service
public class PageService {

    private PageRepository repository;

    public PageService(PageRepository repository) {
        this.repository = repository;
    }

    public org.springframework.data.domain.Page<Page> filter(String id, String locale, Pageable pageable) {

        return repository.findAll((root, q, b) -> {
            Predicate predicateId = b.like(root.get("id"), "%" + id + "%");
            if (Long.class == q.getResultType())
                return predicateId;
            Path key = ((MapJoin) root.fetch("properties", JoinType.LEFT)).key();
            Predicate predicateLocale = b.or(b.equal(key, locale), b.isNull(key));
            return b.and(predicateId, predicateLocale);
        }, pageable);
    }

    public Page one(String id, String locale) {

        return repository.findOne((root, q, b) -> {
            Predicate predicateId = b.equal(root.get("id"), id);
            Predicate predicateLocale = b.equal(((MapJoin) root.fetch("properties")).key(), locale);
            return b.and(predicateId, predicateLocale);
        });
    }
}
