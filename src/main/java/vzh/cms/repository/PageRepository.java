package vzh.cms.repository;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import vzh.cms.model.Page;

import java.util.List;
import java.util.Optional;

/**
 * @author Viktar Zhyhunou
 */
@PreAuthorize("hasRole('ROLE_EDITOR')")
public interface PageRepository extends PagingAndSortingRepository<Page, String>, JpaSpecificationExecutor<Page>, LocalizedRepository<Page> {

    @Override
    @PreAuthorize("permitAll")
    Optional<Page> findOne(Specification<Page> specification);

    @Override
    @PreAuthorize("permitAll")
    <E> List<E> findAll(Specification<Page> specification, Class<E> type);
}
