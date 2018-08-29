package vzh.cms.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import vzh.cms.model.Localized;

import javax.persistence.EntityManager;
import java.io.Serializable;
import java.util.Map;
import java.util.function.Consumer;
import java.util.stream.Collectors;

/**
 * @author Viktar Zhyhunou
 */
public class LocalizedRepositoryImpl<T extends Localized<P>, P, ID extends Serializable> extends RepositoryImpl<T, ID> implements LocalizedRepository<T, P> {

    public LocalizedRepositoryImpl(Class<T> domainClass, EntityManager manager) {
        super(domainClass, manager);
    }

    @Override
    public <E> org.springframework.data.domain.Page<E> findAll(Specification<T> specification, Class<E> type, String locale, Pageable pageable) {
        Consumer<T> consumer = p -> p.setProperties(
                p.getProperties().entrySet().stream()
                        .filter(e -> e.getKey().equals(locale))
                        .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue))
        );
        return findAll(specification, type, consumer, pageable);
    }
}
