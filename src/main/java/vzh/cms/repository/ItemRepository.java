package vzh.cms.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import vzh.cms.model.Item;

/**
 * @author Viktar Zhyhunou
 */
public interface ItemRepository<T extends Item> extends JpaSpecificationExecutor<T>, Repository<T> {

}
