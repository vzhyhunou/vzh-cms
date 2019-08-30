package vzh.cms.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import vzh.cms.consumer.FilesContentConsumer;
import vzh.cms.model.Content;

import javax.persistence.EntityManager;
import java.io.Serializable;
import java.util.List;

/**
 * @author Viktar Zhyhunou
 */
abstract public class ContentRepositoryImpl<T extends Content, ID extends Serializable> extends RepositoryImpl<T, ID> implements Repository<T> {

    private FilesContentConsumer<T> filesContentConsumer;

    protected ContentRepositoryImpl(Class<T> domainClass, EntityManager manager, FilesContentConsumer<T> filesContentConsumer) {
        super(domainClass, manager);
        this.filesContentConsumer = filesContentConsumer;
    }

    @Override
    public <E> List<E> findAll(Specification<T> specification, Class<E> type) {
        return findAll(specification, type, filesContentConsumer);
    }

    @Override
    public <E> Page<E> findAll(Specification<T> specification, Class<E> type, Pageable pageable) {
        return findAll(specification, type, filesContentConsumer, pageable);
    }
}
