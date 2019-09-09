package vzh.cms.repository;

import org.hibernate.query.criteria.internal.path.SetAttributeJoin;
import org.springframework.context.i18n.LocaleContextHolder;
import vzh.cms.model.Content;
import vzh.cms.model.Item_;
import vzh.cms.model.Tag;
import vzh.cms.model.Tag_;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.MapJoin;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.io.Serializable;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * @author Viktar Zhyhunou
 */
abstract class ContentRepositoryImpl<T extends Content, ID extends Serializable> extends ItemRepositoryImpl<T, ID> implements CustomizedContentRepository<T, ID> {

    protected ContentRepositoryImpl(Class<T> domainClass, EntityManager manager) {
        super(domainClass, manager);
    }

    @Override
    public <E> Optional<E> contentByActiveTags(ID id, Class<E> type, Object... names) {
        return findOne((root, q, b) -> {
            MapJoin properties = (MapJoin) root.fetch("properties");
            return b.and(
                    b.equal(root.get("id"), id),
                    filter(root, b, names),
                    b.equal(properties.key(), LocaleContextHolder.getLocale().getLanguage())
            );
        }, type);
    }

    @Override
    public <E> List<E> contentsByActiveTags(Class<E> type, String order, Object... names) {
        return findAll((root, q, b) -> {
            MapJoin properties = (MapJoin) root.fetch("properties");
            q.orderBy(b.asc(properties.value().get(order)));
            return b.and(
                    filter(root, b, names),
                    b.equal(properties.key(), LocaleContextHolder.getLocale().getLanguage())
            );
        }, type);
    }

    private Predicate filter(Root<T> root, CriteriaBuilder b, Object... names) {
        return b.and(
                b.and(Arrays.stream(names).map(n -> {
                    Join<T, Tag> tags = (SetAttributeJoin<T, Tag>) root.<T, Tag>fetch(Item_.TAGS);
                    return b.and(
                            b.equal(tags.get(Tag_.name), n),
                            active(b, tags)
                    );
                }).collect(Collectors.toSet()).toArray(new Predicate[]{}))
        );
    }
}
