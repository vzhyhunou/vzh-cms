package vzh.cms.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

/**
 * @author Viktar Zhyhunou
 */
interface CustomizedRepository<T> {

    <E> Optional<E> findOne(Specification<T> specification, Class<E> type);

    <E> List<E> findAll(Specification<T> specification, Class<E> type);

    <E> Page<E> findAll(Specification<T> specification, Class<E> type, Pageable pageable);
}
