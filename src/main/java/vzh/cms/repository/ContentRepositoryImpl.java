package vzh.cms.repository;

import org.hibernate.query.criteria.internal.path.SetAttributeJoin;
import org.springframework.context.i18n.LocaleContextHolder;
import vzh.cms.model.Content;
import vzh.cms.model.Item_;
import vzh.cms.model.Tag;
import vzh.cms.model.Tag_;

import javax.persistence.EntityManager;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.MapJoin;
import java.io.Serializable;
import java.util.List;
import java.util.Optional;

/**
 * @author Viktar Zhyhunou
 */
abstract class ContentRepositoryImpl<T extends Content, ID extends Serializable> extends ItemRepositoryImpl<T, ID> implements CustomizedContentRepository<T, ID> {

    protected ContentRepositoryImpl(Class<T> domainClass, EntityManager manager) {
        super(domainClass, manager);
    }

    @Override
    public <E> Optional<E> content(ID id, Class<E> type) {
        return findOne((root, q, b) -> {
                    MapJoin properties = (MapJoin) root.fetch("properties");
                    return b.and(
                            b.equal(root.get("id"), id),
                            b.equal(properties.key(), LocaleContextHolder.getLocale().getLanguage())
                    );
                },
                type
        );
    }

    @Override
    public <E> List<E> contentsByActiveTags(Class<E> type, String... names) {
        return findAll((root, q, b) -> {
                    MapJoin properties = (MapJoin) root.fetch("properties");
                    Join<T, Tag> tags = (SetAttributeJoin<T, Tag>) root.<T, Tag>fetch(Item_.TAGS);
                    return b.and(
                            tags.get(Tag_.name).in((Object[]) names),
                            active(b, tags),
                            b.equal(properties.key(), LocaleContextHolder.getLocale().getLanguage())
                    );
                },
                type
        );
    }
}
