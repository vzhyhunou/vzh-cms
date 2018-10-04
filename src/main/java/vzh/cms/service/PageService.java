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
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.MapJoin;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;
import java.util.Objects;
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
            }
            return filter(root, b, filter);
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
