package vzh.cms.service;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vzh.cms.model.Page;
import vzh.cms.dto.PageFilter;
import vzh.cms.model.PageProperty;
import vzh.cms.projection.NoContentPage;
import vzh.cms.projection.TitlePage;
import vzh.cms.repository.PageRepository;

import javax.persistence.criteria.CriteriaBuilder;
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
public class PageService extends BaseService<PageRepository> {

    public PageService(PageRepository repository) {
        super(repository);
    }

    public org.springframework.data.domain.Page<NoContentPage> list(PageFilter filter, String locale, Pageable pageable) {
        return repository.findAll((root, q, b) -> {
            if (Long.class == q.getResultType()) {
                q.distinct(true);
            } else {
                root.fetch("properties", JoinType.LEFT);
                root.fetch("tags", JoinType.LEFT);
            }
            Subquery<Page> subquery = q.subquery(Page.class);
            Root<Page> p = subquery.from(Page.class);
            return root.in(subquery.select(p).where(filter(p, b, filter)));
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

    public Optional<Page> one(String id, String locale) {
        return repository.findOne((root, q, b) ->
                b.and(
                        b.equal(root.get("id"), id),
                        b.equal(((MapJoin) root.fetch("properties")).key(), locale)
                )
        );
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
