package vzh.cms.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import vzh.cms.model.User;

/**
 * @author Viktar Zhyhunou
 */
@PreAuthorize("hasRole('ROLE_MANAGER')")
public interface UserRepository extends PagingAndSortingRepository<User, String>, JpaSpecificationExecutor<User> {

}
