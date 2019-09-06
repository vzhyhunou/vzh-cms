package vzh.cms.repository;

import org.springframework.data.domain.Pageable;
import vzh.cms.dto.PageFilter;
import vzh.cms.model.Item_;
import vzh.cms.model.Page;
import vzh.cms.model.PageProperty;
import vzh.cms.model.PageProperty_;
import vzh.cms.model.Page_;
import vzh.cms.model.Tag;
import vzh.cms.model.Tag_;
import vzh.cms.projection.RowPage;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.MapJoin;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;

/**
 * @author Viktar Zhyhunou
 */
class PageRepositoryImpl extends ContentRepositoryImpl<Page, String> implements CustomizedPageRepository {

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
                root.fetch(Item_.TAGS, JoinType.LEFT);
            }
            return root.in(subquery.select(p).where(filter(p, b, filter)));
        }, RowPage.class, pageable);
    }

    private static Predicate filter(Root<Page> root, CriteriaBuilder b, PageFilter filter) {
        MapJoin<Page, String, PageProperty> properties = root.joinMap(Page_.PROPERTIES, JoinType.LEFT);
        Join<Page, Tag> tags = root.join(Item_.TAGS, JoinType.LEFT);
        return b.and(nonNull(
                contains(b, root.get(Page_.id), filter.getId()),
                in(tags.get(Tag_.name), filter.getTags()),
                contains(b, properties.value().get(PageProperty_.title), filter.getTitle()),
                contains(b, properties.value().get(PageProperty_.content), filter.getContent())
        ));
    }
}
