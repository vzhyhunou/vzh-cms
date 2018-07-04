package vzh.cms.service;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vzh.cms.model.Page;
import vzh.cms.model.PageFilter;
import vzh.cms.model.PageProperty;
import vzh.cms.repository.PageRepository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.MapJoin;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Stream;

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
            if (Long.class == q.getResultType()) {
                q.distinct(true);
                return filter(root, b, filter);
            } else {
                root.fetch("properties", JoinType.LEFT);
                Subquery<Page> subquery = q.subquery(Page.class);
                Root<Page> p = subquery.from(Page.class);
                return root.in(subquery.select(p).where(filter(p, b, filter)));
            }
        }, pageable);
    }

    public Page one(String id, String locale) {
        return repository.findOne((root, q, b) ->
                b.and(
                        b.equal(root.get("id"), id),
                        b.equal(((MapJoin) root.fetch("properties")).key(), locale)
                )
        );
    }

    private static Predicate filter(CriteriaBuilder b, Expression<String> expression, Object field) {
        return Optional.ofNullable(field)
                .map(f -> b.like(b.lower(expression), "%" + f.toString().toLowerCase() + "%"))
                .orElse(null);
    }

    private static Predicate filter(Root<Page> root, CriteriaBuilder b, PageFilter filter) {
        MapJoin<Page, String, PageProperty> properties =
                (MapJoin<Page, String, PageProperty>) root.<Page, PageProperty>join("properties", JoinType.LEFT);
        return b.and(Stream.of(
                filter(b, root.get("id"), filter.getId()),
                filter(b, properties.value().get("title"), filter.getTitle())
        ).filter(Objects::nonNull).toArray(Predicate[]::new));
    }
}
