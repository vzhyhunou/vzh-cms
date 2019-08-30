package vzh.cms.service;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vzh.cms.dto.PageFilter;
import vzh.cms.model.Page;
import vzh.cms.model.PageProperty;
import vzh.cms.model.Tag;
import vzh.cms.projection.RowPage;
import vzh.cms.repository.PageRepository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.MapJoin;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;
import java.util.Objects;
import java.util.stream.Stream;

/**
 * @author Viktar Zhyhunou
 */
@Service
public class PageService extends ContentService<Page, PageRepository> {

    public PageService(PageRepository repository) {
        super(repository);
    }

    public org.springframework.data.domain.Page<RowPage> list(PageFilter filter, String lang, Pageable pageable) {
        return repository.findAll((root, q, b) -> {
            if (Long.class == q.getResultType()) {
                q.distinct(true);
            } else {
                MapJoin<Page, String, PageProperty> properties = root.joinMap("properties", JoinType.LEFT);
                properties.on(b.equal(properties.key(), lang));
                root.fetch("tags", JoinType.LEFT);
            }
            Subquery<Page> subquery = q.subquery(Page.class);
            Root<Page> p = subquery.from(Page.class);
            return root.in(subquery.select(p).where(filter(p, b, filter)));
        }, RowPage.class, pageable);
    }

    private static Predicate filter(Root<Page> root, CriteriaBuilder b, PageFilter filter) {
        MapJoin<Page, String, PageProperty> properties = root.joinMap("properties", JoinType.LEFT);
        Join<Page, Tag> tags = root.join("tags", JoinType.LEFT);
        return b.and(Stream.of(
                like(b, root.get("id"), filter.getId()),
                in(tags.get("name"), filter.getTags()),
                like(b, properties.value().get("title"), filter.getTitle()),
                like(b, properties.value().get("content"), filter.getContent())
        ).filter(Objects::nonNull).toArray(Predicate[]::new));
    }
}
