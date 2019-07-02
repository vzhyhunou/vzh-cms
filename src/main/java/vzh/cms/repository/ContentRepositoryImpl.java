package vzh.cms.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import vzh.cms.consumer.LangContentConsumer;
import vzh.cms.model.Content;

import javax.persistence.EntityManager;
import java.io.Serializable;
import java.util.List;

/**
 * @author Viktar Zhyhunou
 */
abstract public class ContentRepositoryImpl<T extends Content, ID extends Serializable> extends ItemRepositoryImpl<T, ID> implements ContentRepository<T> {

    protected ContentRepositoryImpl(Class<T> domainClass, EntityManager manager) {
        super(domainClass, manager);
    }

    @Override
    public <E> List<E> findAll(Specification<T> specification, Class<E> type, String lang) {
        return findAll(specification, type, new LangContentConsumer<>(lang));
    }

    @Override
    public <E> Page<E> findAll(Specification<T> specification, Class<E> type, String lang, Pageable pageable) {
        return findAll(specification, type, new LangContentConsumer<>(lang), pageable);
    }
}
