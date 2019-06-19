package vzh.cms.service;

import vzh.cms.model.Content;
import vzh.cms.repository.ContentRepository;

import javax.persistence.criteria.MapJoin;
import java.util.Optional;

abstract class ContentService<T extends Content> extends BaseService {

    protected ContentRepository<T> repository;

    public ContentService(ContentRepository<T> repository) {
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
}
