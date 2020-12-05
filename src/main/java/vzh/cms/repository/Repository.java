package vzh.cms.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.io.Serializable;
import java.util.List;

/**
 * @author Viktar Zhyhunou
 */
@NoRepositoryBean
public interface Repository<T, ID extends Serializable> extends PagingAndSortingRepository<T, ID>, JpaSpecificationExecutor<T> {

    List<T> findByIdIn(ID[] ids);
}
