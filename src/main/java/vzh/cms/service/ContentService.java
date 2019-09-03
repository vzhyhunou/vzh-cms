package vzh.cms.service;

import org.springframework.context.i18n.LocaleContextHolder;
import vzh.cms.model.Content;
import vzh.cms.model.Item_;
import vzh.cms.model.Tag_;
import vzh.cms.repository.Repository;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.MapJoin;
import java.io.Serializable;
import java.util.List;
import java.util.Optional;

abstract public class ContentService<T extends Content, ID extends Serializable, R extends Repository<T, ID>> extends ItemService<T, ID, R> {

    protected ContentService(R repository) {
        super(repository);
    }

    public <E> Optional<E> one(Object id, Class<E> type) {
        return repository.findOne((root, q, b) -> {
                    MapJoin properties = (MapJoin) root.fetch("properties");
                    return b.and(
                            b.equal(root.get("id"), id),
                            b.equal(properties.key(), LocaleContextHolder.getLocale().getLanguage())
                    );
                },
                type
        );
    }

    @SuppressWarnings("unchecked")
    public <E> List<E> listByActiveTags(Class<E> type, String... names) {
        return repository.findAll((root, q, b) -> {
                    MapJoin properties = (MapJoin) root.fetch("properties");
                    Join tags = (Join) root.fetch(Item_.TAGS);
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
