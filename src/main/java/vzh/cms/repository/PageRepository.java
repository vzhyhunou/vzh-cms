package vzh.cms.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RestResource;
import vzh.cms.model.Page;

/**
 * @author Viktar Zhyhunou
 */
public interface PageRepository extends PagingAndSortingRepository<Page, String> {

    @RestResource(path = "filter")
    org.springframework.data.domain.Page<Page> findByIdContaining(@Param("id") String id, Pageable pageable);
}
