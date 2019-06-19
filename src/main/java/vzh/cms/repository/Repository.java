package vzh.cms.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.function.Consumer;

/**
 * @author Viktar Zhyhunou
 */
public interface Repository<T> extends JpaSpecificationExecutor<T> {

    <E> List<E> findAll(Specification<T> specification, Class<E> type);

    List<T> findAll(Specification<T> specification, Consumer<T> consumer);

    <E> List<E> findAll(Specification<T> specification, Class<E> type, Consumer<T> consumer);

    <E> Page<E> findAll(Specification<T> specification, Class<E> type, Pageable pageable);

    Page<T> findAll(Specification<T> specification, Consumer<T> consumer, Pageable pageable);

    <E> Page<E> findAll(Specification<T> specification, Class<E> type, Consumer<T> consumer, Pageable pageable);
}
