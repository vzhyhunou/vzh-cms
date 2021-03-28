package vzh.cms.repository;

import org.springframework.context.i18n.LocaleContextHolder;
import vzh.cms.model.Tagged;

import javax.persistence.EntityManager;
import javax.persistence.criteria.MapJoin;
import java.io.Serializable;
import java.util.List;
import java.util.Optional;

/**
 * @author Viktar Zhyhunou
 */
public abstract class ContentRepositoryImpl<T extends Tagged<ID>, ID extends Serializable> extends TaggedRepositoryImpl<T, ID> implements CustomizedContentRepository<T, ID> {

    private static final String PROPERTIES = "properties";

    protected ContentRepositoryImpl(Class<T> domainClass, EntityManager manager) {
        super(domainClass, manager);
    }

    @Override
    public <E> Optional<E> contentByActiveTags(ID id, Class<E> type, Object... names) {
        return findOne((root, q, b) -> {
            MapJoin<?, ?, ?> properties = (MapJoin<?, ?, ?>) root.fetch(PROPERTIES);
            return b.and(
                    filterAny(root, q, b, b.equal(root.get(ID), id), names),
                    b.equal(properties.key(), LocaleContextHolder.getLocale().getLanguage())
            );
        }, type);
    }

    @Override
    public <E> List<E> contentsByActiveTags(Class<E> type, String order, Object... names) {
        return findAll((root, q, b) -> {
            MapJoin<?, ?, ?> properties = (MapJoin<?, ?, ?>) root.fetch(PROPERTIES);
            q.orderBy(b.asc(properties.value().get(order)));
            return b.and(
                    filterAll(root, q, b, b.and(), names),
                    b.equal(properties.key(), LocaleContextHolder.getLocale().getLanguage())
            );
        }, type);
    }
}
