package vzh.cms.repository;

import org.springframework.data.domain.Pageable;
import vzh.cms.dto.PageFilter;
import vzh.cms.model.Page;
import vzh.cms.model.Page_;
import vzh.cms.model.Tag;
import vzh.cms.model.Tag_;
import vzh.cms.model.Tagged_;
import vzh.cms.projection.PropertyPage;
import vzh.cms.projection.RowPage;
import vzh.cms.projection.TitlePage;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.MapJoin;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;
import java.util.Optional;

import static org.springframework.context.i18n.LocaleContextHolder.getLocale;
import static vzh.cms.model.PageTag.MENU;
import static vzh.cms.model.PageTag.PUBLISHED;

/**
 * @author Viktar Zhyhunou
 */
public class PageRepositoryImpl extends TaggedRepositoryImpl<Page, String> implements CustomizedPageRepository {

    public PageRepositoryImpl(EntityManager em) {
        super(Page.class, em);
    }

    public org.springframework.data.domain.Page<RowPage> list(PageFilter filter, Pageable pageable) {
        return findAll((root, q, b) -> {
            if (Long.class != q.getResultType()) {
                root.fetch(Page_.TITLE, JoinType.LEFT);
                root.fetch(Tagged_.TAGS, JoinType.LEFT);
            }
            q.distinct(true);
            return filter(root, b, filter);
        }, RowPage.class, pageable);
    }

    public Optional<PropertyPage> one(String id, boolean editor) {
        return findOne((root, q, b) -> {
            MapJoin<?, ?, ?> title = (MapJoin<?, ?, ?>) root.fetch(Page_.TITLE, JoinType.LEFT);
            MapJoin<?, ?, ?> content = (MapJoin<?, ?, ?>) root.fetch(Page_.CONTENT);
            String language = getLocale().getLanguage();
            return b.and(
                    b.equal(root.get(Page_.id), id),
                    editor ? b.and() : any(root, q, b, PUBLISHED.name()),
                    b.or(b.equal(title.key(), language), b.isNull(title.key())),
                    b.equal(content.key(), language)
            );
        }, PropertyPage.class);
    }

    public List<TitlePage> menu() {
        return findAll((root, q, b) -> {
            MapJoin<?, ?, ?> title = (MapJoin<?, ?, ?>) root.fetch(Page_.TITLE);
            q.orderBy(b.asc(title.value()));
            return b.and(
                    any(root, q, b, MENU.name()),
                    b.equal(title.key(), getLocale().getLanguage())
            );
        }, TitlePage.class);
    }

    protected static Predicate filter(Root<Page> root, CriteriaBuilder b, PageFilter filter) {
        MapJoin<Page, String, String> title = root.joinMap(Page_.TITLE, JoinType.LEFT);
        MapJoin<Page, String, String> content = root.joinMap(Page_.CONTENT, JoinType.LEFT);
        Path<Tag> tags = root.join(Tagged_.TAGS, JoinType.LEFT);
        return b.and(
                contains(b, root.get(Page_.id), filter.getId()),
                in(b, tags.get(Tag_.name), filter.getTags()),
                contains(b, title.value(), filter.getTitle()),
                contains(b, content.value(), filter.getContent())
        );
    }
}
