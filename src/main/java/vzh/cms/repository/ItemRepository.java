package vzh.cms.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.NoRepositoryBean;
import vzh.cms.model.Item;

import java.util.Date;

/**
 * @author Viktar Zhyhunou
 */
@NoRepositoryBean
public interface ItemRepository<T extends Item, ID> extends Repository<T, ID> {

    Page<Item> findByDateGreaterThan(Date date, Pageable pageable);

    long countByDateGreaterThan(Date date);
}
