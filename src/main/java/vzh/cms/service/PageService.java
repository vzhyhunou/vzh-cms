package vzh.cms.service;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vzh.cms.dto.PageFilter;
import vzh.cms.model.Page;
import vzh.cms.model.Page_;
import vzh.cms.model.Tag;
import vzh.cms.model.Tag_;
import vzh.cms.model.Tagged_;
import vzh.cms.projection.PropertyPage;
import vzh.cms.projection.RowPage;
import vzh.cms.projection.TitlePage;
import vzh.cms.repository.PageRepository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.MapJoin;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;
import java.util.Optional;

import static org.springframework.context.i18n.LocaleContextHolder.getLocale;

/**
 * @author Viktar Zhyhunou
 */
@Service
public class PageService extends TaggedService<Page> {

    private final PageRepository repository;

    public PageService(PageRepository repository) {
        super(Page.class);
        this.repository = repository;
    }

    public org.springframework.data.domain.Page<RowPage> list(PageFilter filter, Pageable pageable) {
        return repository.findAll((root, q, b) -> {
            if (Long.class != q.getResultType()) {
                root.fetch(Page_.TITLE, JoinType.LEFT);
                root.fetch(Tagged_.TAGS, JoinType.LEFT);
            }
            q.distinct(true);
            return filter(root, b, filter);
        }, RowPage.class, pageable);
    }

    public Optional<PropertyPage> one(String id, String... names) {
        return repository.findOne((root, q, b) -> {
            MapJoin<?, ?, ?> title = (MapJoin<?, ?, ?>) root.fetch(Page_.TITLE);
            MapJoin<?, ?, ?> content = (MapJoin<?, ?, ?>) root.fetch(Page_.CONTENT);
            String language = getLocale().getLanguage();
            return b.and(
                    b.equal(root.get(Page_.ID), id),
                    filterAny(root, q, b, names),
                    b.equal(title.key(), language),
                    b.equal(content.key(), language)
            );
        }, PropertyPage.class);
    }

    public List<TitlePage> menu(String... names) {
        return repository.findAll((root, q, b) -> {
            MapJoin<?, ?, ?> title = (MapJoin<?, ?, ?>) root.fetch(Page_.TITLE);
            q.orderBy(b.asc(title.value()));
            return b.and(
                    filterAll(root, q, b, names),
                    b.equal(title.key(), getLocale().getLanguage())
            );
        }, TitlePage.class);
    }

    private static Predicate filter(Root<Page> root, CriteriaBuilder b, PageFilter filter) {
        MapJoin<Page, String, String> title = root.joinMap(Page_.TITLE, JoinType.LEFT);
        MapJoin<Page, String, String> content = root.joinMap(Page_.CONTENT, JoinType.LEFT);
        Join<Page, Tag> tags = root.join(Tagged_.TAGS, JoinType.LEFT);
        return b.and(nonNull(
                contains(b, root.get(Page_.id), filter.getId()),
                in(tags.get(Tag_.name), filter.getTags()),
                contains(b, title.value(), filter.getTitle()),
                contains(b, content.value(), filter.getContent())
        ));
    }
}
