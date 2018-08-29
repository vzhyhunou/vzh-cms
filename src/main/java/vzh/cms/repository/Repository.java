package vzh.cms.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.function.Consumer;

/**
 * @author Viktar Zhyhunou
 */
public interface Repository<T> {

    <E> Page<E> findAll(Specification<T> specification, Class<E> type, Pageable pageable);

    Page<T> findAll(Specification<T> specification, Consumer<T> consumer, Pageable pageable);

    <E> Page<E> findAll(Specification<T> specification, Class<E> type, Consumer<T> consumer, Pageable pageable);
}
