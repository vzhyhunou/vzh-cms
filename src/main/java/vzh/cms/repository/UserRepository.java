package vzh.cms.repository;

import org.springframework.security.access.prepost.PreAuthorize;
import vzh.cms.model.User;

/**
 * @author Viktar Zhyhunou
 */
@PreAuthorize("hasRole('ROLE_MANAGER')")
public interface UserRepository extends Repository<User, String> {
}
