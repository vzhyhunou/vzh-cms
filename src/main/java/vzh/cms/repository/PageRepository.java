package vzh.cms.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import vzh.cms.model.Page;
import vzh.cms.model.PageProperty;

/**
 * @author Viktar Zhyhunou
 */
public interface PageRepository extends PagingAndSortingRepository<Page, String>, JpaSpecificationExecutor<Page>, LocalizedRepository<Page, PageProperty> {

}
