package vzh.cms.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import vzh.cms.model.Content;

import javax.persistence.EntityManager;
import java.io.Serializable;
import java.util.List;
import java.util.function.Consumer;
import java.util.stream.Collectors;

/**
 * @author Viktar Zhyhunou
 */
abstract class ContentRepositoryImpl<T extends Content, ID extends Serializable> extends RepositoryImpl<T, ID> implements ContentRepository<T> {

    protected ContentRepositoryImpl(Class<T> domainClass, EntityManager manager) {
        super(domainClass, manager);
    }

    @Override
    public <E> List<E> findAll(Specification<T> specification, Class<E> type, String locale) {
        return findAll(specification, type, getConsumer(locale));
    }

    @Override
    public <E> Page<E> findAll(Specification<T> specification, Class<E> type, String locale, Pageable pageable) {
        return findAll(specification, type, getConsumer(locale), pageable);
    }

    private Consumer<T> getConsumer(String locale) {
        return p -> p.getProperties().keySet().stream().filter(k -> !k.equals(locale)).collect(Collectors.toSet())
                .forEach(k -> p.getProperties().remove(k));
    }
}
