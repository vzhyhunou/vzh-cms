package vzh.cms.repository;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;
import vzh.cms.model.User;

import java.util.List;

/**
 * @author Viktar Zhyhunou
 */
@PreAuthorize("hasRole('ROLE_MANAGER')")
public interface UserRepository extends PagingAndSortingRepository<User, String>, JpaSpecificationExecutor<User>, Repository<User> {

    List<User> findByIdIn(@Param("ids") String[] ids);
}
