package vzh.cms.service;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vzh.cms.model.NoContentPage;
import vzh.cms.model.Page;
import vzh.cms.model.PageFilter;
import vzh.cms.model.PageProperty;
import vzh.cms.model.TitlePage;
import vzh.cms.repository.PageRepository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Expression;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.MapJoin;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;
import java.util.List;
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

    public org.springframework.data.domain.Page<NoContentPage> list(PageFilter filter, String locale, Pageable pageable) {
        return repository.findAll((root, q, b) -> {
            if (Long.class == q.getResultType()) {
                q.distinct(true);
                return filter(root, b, filter);
            } else {
                root.fetch("properties", JoinType.LEFT);
                root.fetch("tags", JoinType.LEFT);
                Subquery<Page> subquery = q.subquery(Page.class);
                Root<Page> p = subquery.from(Page.class);
                return root.in(subquery.select(p).where(filter(p, b, filter)));
            }
        }, NoContentPage.class, locale, pageable);
    }

    public List<TitlePage> menu(String locale) {
        return repository.findAll((root, q, b) ->
                        b.and(
                                ((Join) root.fetch("tags")).in("menu"),
                                b.equal(((MapJoin) root.fetch("properties")).key(), locale)
                        ),
                TitlePage.class
        );
    }

    public Page one(String id, String locale) {
        return repository.findOne((root, q, b) ->
                b.and(
                        b.equal(root.get("id"), id),
                        b.equal(((MapJoin) root.fetch("properties")).key(), locale)
                )
        );
    }

    private static Predicate like(CriteriaBuilder b, Expression<String> expression, String field) {
        return Optional.ofNullable(field)
                .map(f -> b.like(b.lower(expression), String.format("%%%s%%", f.toLowerCase())))
                .orElse(null);
    }

    private static Predicate in(Expression<String[]> expression, Object[] fields) {
        return Optional.ofNullable(fields)
                .map(f -> expression.in(fields))
                .orElse(null);
    }

    private static Predicate filter(Root<Page> root, CriteriaBuilder b, PageFilter filter) {
        MapJoin<Page, String, PageProperty> properties =
                (MapJoin<Page, String, PageProperty>) root.<Page, PageProperty>join("properties", JoinType.LEFT);
        Join<Page, String[]> tags = root.join("tags", JoinType.LEFT);
        return b.and(Stream.of(
                like(b, root.get("id"), filter.getId()),
                in(tags, filter.getTags()),
                like(b, properties.value().get("title"), filter.getTitle()),
                like(b, properties.value().get("content"), filter.getContent())
        ).filter(Objects::nonNull).toArray(Predicate[]::new));
    }
}
