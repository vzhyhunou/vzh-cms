package vzh.cms.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;

/**
 * @author Viktar Zhyhunou
 */
@NoRepositoryBean
public interface BaseRepository<T, ID> extends PagingAndSortingRepository<T, ID>, JpaSpecificationExecutor<T>, CustomizedRepository<T, ID> {

    List<T> findByIdIn(ID[] ids);
}
