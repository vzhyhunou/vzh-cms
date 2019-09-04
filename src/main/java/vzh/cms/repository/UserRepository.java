package vzh.cms.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import vzh.cms.model.User;

/**
 * @author Viktar Zhyhunou
 */
public interface UserRepository extends PagingAndSortingRepository<User, String>, JpaSpecificationExecutor<User>, CustomizedUserRepository {
}
