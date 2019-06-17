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
abstract class ContentRepositoryImpl<T extends Content, ID extends Serializable> extends ItemRepositoryImpl<T, ID> implements ContentRepository<T> {

    protected ContentRepositoryImpl(Class<T> domainClass, EntityManager manager) {
        super(domainClass, manager);
    }

    @Override
    public <E> List<E> findAll(Specification<T> specification, Class<E> type, String lang) {
        return findAll(specification, type, getConsumer(lang));
    }

    @Override
    public <E> Page<E> findAll(Specification<T> specification, Class<E> type, String lang, Pageable pageable) {
        return findAll(specification, type, getConsumer(lang), pageable);
    }

    private Consumer<T> getConsumer(String lang) {
        return p -> p.getProperties().keySet().stream().filter(k -> !k.equals(lang)).collect(Collectors.toSet())
                .forEach(k -> p.getProperties().remove(k));
    }
}