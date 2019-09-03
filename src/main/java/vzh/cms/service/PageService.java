package vzh.cms.service;

import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vzh.cms.dto.PageFilter;
import vzh.cms.model.Item_;
import vzh.cms.model.Page;
import vzh.cms.model.PageProperty;
import vzh.cms.model.PageProperty_;
import vzh.cms.model.Page_;
import vzh.cms.model.Tag;
import vzh.cms.model.Tag_;
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
public class PageService extends ContentService<Page, String, PageRepository> {

    public PageService(PageRepository repository) {
        super(repository);
    }

    public org.springframework.data.domain.Page<RowPage> list(PageFilter filter, Pageable pageable) {
        return repository.findAll((root, q, b) -> {
            Subquery<Page> subquery = q.subquery(Page.class);
            Root<Page> p = subquery.from(Page.class);
            if (Long.class != q.getResultType()) {
                MapJoin properties = (MapJoin) root.fetch("properties", JoinType.LEFT);
                root.fetch(Item_.TAGS, JoinType.LEFT);
                return b.and(
                        root.in(subquery.select(p).where(filter(p, b, filter))),
                        b.or(
                                b.equal(properties.key(), LocaleContextHolder.getLocale().getLanguage()),
                                b.isNull(properties.key())
                        )
                );
            }
            return root.in(subquery.select(p).where(filter(p, b, filter)));
        }, RowPage.class, pageable);
    }

    private static Predicate filter(Root<Page> root, CriteriaBuilder b, PageFilter filter) {
        MapJoin<Page, String, PageProperty> properties = root.joinMap(Page_.PROPERTIES, JoinType.LEFT);
        Join<Page, Tag> tags = root.join(Item_.TAGS, JoinType.LEFT);
        return b.and(Stream.of(
                like(b, root.get(Page_.id), filter.getId()),
                in(tags.get(Tag_.name), filter.getTags()),
                like(b, properties.value().get(PageProperty_.title), filter.getTitle()),
                like(b, properties.value().get(PageProperty_.content), filter.getContent())
        ).filter(Objects::nonNull).toArray(Predicate[]::new));
    }
}
