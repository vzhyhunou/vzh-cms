package vzh.cms.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;

/**
 * @author Viktar Zhyhunou
 */
public interface ContentRepository<T> extends Repository<T> {

    <E> List<E> findAll(Specification<T> specification, Class<E> type, String locale);

    <E> Page<E> findAll(Specification<T> specification, Class<E> type, String locale, Pageable pageable);
}
