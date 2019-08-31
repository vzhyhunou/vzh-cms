package vzh.cms.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

/**
 * @author Viktar Zhyhunou
 */
public interface Repository<T> extends JpaSpecificationExecutor<T> {

    <E> List<E> findAll(Specification<T> specification, Class<E> type);

    <E> Page<E> findAll(Specification<T> specification, Class<E> type, Pageable pageable);
}
