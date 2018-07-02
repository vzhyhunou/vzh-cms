package vzh.cms.service;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vzh.cms.model.Page;
import vzh.cms.model.PageFilter;
import vzh.cms.repository.PageRepository;

import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.MapJoin;
import javax.persistence.criteria.Predicate;
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

    public org.springframework.data.domain.Page<Page> list(PageFilter filter, Pageable pageable) {
        return repository.findAll((root, q, b) -> {
            Predicate predicateId = b.like(root.get("id"), like(filter.getId()));
            if (Long.class != q.getResultType())
                root.fetch("properties", JoinType.LEFT);
            return predicateId;
        }, pageable);
    }

    public Page one(String id, String locale) {
        return repository.findOne((root, q, b) -> {
            Predicate predicateId = b.equal(root.get("id"), id);
            Predicate predicateLocale = b.equal(((MapJoin) root.fetch("properties")).key(), locale);
            return b.and(predicateId, predicateLocale);
        });
    }

    private static String like(Object field) {
        return Optional.ofNullable(field).map(f -> "%" + f + "%").orElse("%");
    }
}
