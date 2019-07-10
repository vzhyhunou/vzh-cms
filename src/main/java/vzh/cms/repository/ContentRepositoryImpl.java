package vzh.cms.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import vzh.cms.consumer.FilesContentConsumer;
import vzh.cms.consumer.LangContentConsumer;
import vzh.cms.consumer.MultiConsumer;
import vzh.cms.model.Content;

import javax.persistence.EntityManager;
import java.io.Serializable;
import java.util.List;

/**
 * @author Viktar Zhyhunou
 */
abstract public class ContentRepositoryImpl<T extends Content, ID extends Serializable> extends ItemRepositoryImpl<T, ID> implements ContentRepository<T> {

    private FilesContentConsumer filesContentConsumer;

    protected ContentRepositoryImpl(Class<T> domainClass, EntityManager manager, FilesContentConsumer filesContentConsumer) {
        super(domainClass, manager);
        this.filesContentConsumer = filesContentConsumer;
    }

    @Override
    public <E> List<E> findAll(Specification<T> specification, Class<E> type, String lang) {
        return findAll(specification, type, new MultiConsumer<T>(new LangContentConsumer(lang), filesContentConsumer));
    }

    @Override
    public <E> Page<E> findAll(Specification<T> specification, Class<E> type, String lang, Pageable pageable) {
        return findAll(specification, type, new MultiConsumer<T>(new LangContentConsumer(lang), filesContentConsumer), pageable);
    }
}
