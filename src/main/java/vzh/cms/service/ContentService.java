package vzh.cms.service;

import vzh.cms.model.Content;
import vzh.cms.repository.ContentRepository;

import javax.persistence.criteria.Join;
import javax.persistence.criteria.MapJoin;
import java.util.List;
import java.util.Optional;

abstract public class ContentService<T extends Content, R extends ContentRepository<T>> extends BaseService {

    protected R repository;

    public ContentService(R repository) {
        this.repository = repository;
    }

    public Optional<T> one(String id, String lang) {
        return repository.findOne((root, q, b) -> {
                    MapJoin properties = (MapJoin) root.fetch("properties");
                    return b.and(
                            b.equal(root.get("id"), id),
                            b.equal(properties.key(), lang)
                    );
                }
        );
    }

    @SuppressWarnings("unchecked")
    public <E> List<E> listByActiveTags(String lang, Class<E> type, String... names) {
        return repository.findAll((root, q, b) -> {
                    MapJoin properties = (MapJoin) root.fetch("properties");
                    Join tags = (Join) root.fetch("tags");
                    return b.and(
                            tags.get("name").in((Object[]) names),
                            active(b, tags.get("start"), tags.get("end")),
                            b.equal(properties.key(), lang)
                    );
                },
                type
        );
    }
}
