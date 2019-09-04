package vzh.cms.repository;

import org.springframework.data.domain.Pageable;
import vzh.cms.dto.PageFilter;
import vzh.cms.model.Page;
import vzh.cms.projection.RowPage;

/**
 * @author Viktar Zhyhunou
 */
interface CustomizedPageRepository extends CustomizedContentRepository<Page> {

    org.springframework.data.domain.Page<RowPage> list(PageFilter filter, Pageable pageable);
}
