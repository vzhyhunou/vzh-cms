package vzh.cms.repository;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import vzh.cms.model.Page;

import java.util.List;
import java.util.Optional;

/**
 * @author Viktar Zhyhunou
 */
@PreAuthorize("hasRole('ROLE_EDITOR')")
public interface PageRepository extends PagingAndSortingRepository<Page, String>, Repository<Page> {

    @Override
    @PreAuthorize("permitAll")
    <E> Optional<E> findOne(Specification<Page> specification, Class<E> type);

    @Override
    @PreAuthorize("permitAll")
    <E> List<E> findAll(Specification<Page> specification, Class<E> type);
}
