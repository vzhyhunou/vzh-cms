package vzh.cms.repository;

import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Pageable;
import vzh.cms.dto.PageFilter;
import vzh.cms.model.Page;
import vzh.cms.model.PageProperty;
import vzh.cms.model.PageProperty_;
import vzh.cms.model.Page_;
import vzh.cms.model.Tag;
import vzh.cms.model.Tag_;
import vzh.cms.model.Tagged_;
import vzh.cms.projection.PropertyPage;
import vzh.cms.projection.RowPage;
import vzh.cms.projection.TitlePage;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.MapJoin;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;
import java.util.List;
import java.util.Optional;

/**
 * @author Viktar Zhyhunou
 */
class PageRepositoryImpl extends TaggedRepositoryImpl<Page, String> implements CustomizedPageRepository {

    PageRepositoryImpl(EntityManager manager) {
        super(Page.class, manager);
    }

    @Override
    public org.springframework.data.domain.Page<RowPage> list(PageFilter filter, Pageable pageable) {
        return findAll((root, q, b) -> {
            Subquery<Page> subquery = q.subquery(Page.class);
            Root<Page> p = subquery.from(Page.class);
            if (Long.class != q.getResultType()) {
                root.fetch(Page_.PROPERTIES, JoinType.LEFT);
                root.fetch(Tagged_.TAGS, JoinType.LEFT);
            }
            return root.in(subquery.select(p).where(filter(p, b, filter)));
        }, RowPage.class, pageable);
    }

    @Override
    public Optional<PropertyPage> one(String id, Object... names) {
        return findOne((root, q, b) -> {
            MapJoin<?, ?, ?> properties = (MapJoin<?, ?, ?>) root.fetch(Page_.PROPERTIES);
            return b.and(
                    filterAny(root, q, b, b.equal(root.get(ID), id), names),
                    b.equal(properties.key(), LocaleContextHolder.getLocale().getLanguage())
            );
        }, PropertyPage.class);
    }

    @Override
    public List<TitlePage> menu(Object... names) {
        return findAll((root, q, b) -> {
            MapJoin<?, ?, ?> properties = (MapJoin<?, ?, ?>) root.fetch(Page_.PROPERTIES);
            q.orderBy(b.asc(properties.value().get(PageProperty_.TITLE)));
            return b.and(
                    filterAll(root, q, b, b.and(), names),
                    b.equal(properties.key(), LocaleContextHolder.getLocale().getLanguage())
            );
        }, TitlePage.class);
    }

    private static Predicate filter(Root<Page> root, CriteriaBuilder b, PageFilter filter) {
        MapJoin<Page, String, PageProperty> properties = root.joinMap(Page_.PROPERTIES, JoinType.LEFT);
        Join<Page, Tag> tags = root.join(Tagged_.TAGS, JoinType.LEFT);
        return b.and(nonNull(
                contains(b, root.get(Page_.id), filter.getId()),
                in(tags.get(Tag_.name), filter.getTags()),
                contains(b, properties.value().get(PageProperty_.title), filter.getTitle()),
                contains(b, properties.value().get(PageProperty_.content), filter.getContent())
        ));
    }
}
