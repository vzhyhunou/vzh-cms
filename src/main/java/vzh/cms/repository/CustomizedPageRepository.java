package vzh.cms.repository;

import org.springframework.data.domain.Pageable;
import vzh.cms.dto.PageFilter;
import vzh.cms.model.Page;
import vzh.cms.projection.PropertyPage;
import vzh.cms.projection.RowPage;
import vzh.cms.projection.TitlePage;

import java.util.List;
import java.util.Optional;

/**
 * @author Viktar Zhyhunou
 */
interface CustomizedPageRepository extends CustomizedRepository<Page, String> {

    org.springframework.data.domain.Page<RowPage> list(PageFilter filter, Pageable pageable);

    Optional<PropertyPage> one(String id, String... names);

    List<TitlePage> menu(String... names);
}
