package vzh.cms.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import vzh.cms.model.Content;

import java.util.List;

/**
 * @author Viktar Zhyhunou
 */
public interface ContentRepository<T extends Content> extends ItemRepository<T> {

    <E> List<E> findAll(Specification<T> specification, Class<E> type, String lang);

    <E> Page<E> findAll(Specification<T> specification, Class<E> type, String lang, Pageable pageable);
}
