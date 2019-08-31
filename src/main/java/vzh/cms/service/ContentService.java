package vzh.cms.service;

import org.springframework.context.i18n.LocaleContextHolder;
import vzh.cms.model.Content;
import vzh.cms.repository.Repository;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.MapJoin;
import java.util.List;
import java.util.Optional;

abstract public class ContentService<T extends Content, R extends Repository<T>> extends BaseService {

    protected R repository;

    public ContentService(R repository) {
        this.repository = repository;
    }

    public Optional<T> one(String id) {
        return repository.findOne((root, q, b) -> {
                    MapJoin properties = (MapJoin) root.fetch("properties");
                    return b.and(
                            b.equal(root.get("id"), id),
                            b.equal(properties.key(), LocaleContextHolder.getLocale().getLanguage())
                    );
                }
        );
    }

    @SuppressWarnings("unchecked")
    public <E> List<E> listByActiveTags(Class<E> type, String... names) {
        return repository.findAll((root, q, b) -> {
                    MapJoin properties = (MapJoin) root.fetch("properties");
                    Join tags = (Join) root.fetch("tags");
                    return b.and(
                            tags.get("name").in((Object[]) names),
                            active(b, tags.get("start"), tags.get("end")),
                            b.equal(properties.key(), LocaleContextHolder.getLocale().getLanguage())
                    );
                },
                type
        );
    }
}
