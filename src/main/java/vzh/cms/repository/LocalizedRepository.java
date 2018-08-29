package vzh.cms.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import vzh.cms.model.Localized;

/**
 * @author Viktar Zhyhunou
 */
public interface LocalizedRepository<T extends Localized<P>, P> extends Repository<T> {

    <E> org.springframework.data.domain.Page<E> findAll(Specification<T> specification, Class<E> type, String locale, Pageable pageable);
}
