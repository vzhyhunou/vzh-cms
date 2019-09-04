package vzh.cms.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vzh.cms.dto.UserFilter;
import vzh.cms.model.User;
import vzh.cms.projection.RowUser;

/**
 * @author Viktar Zhyhunou
 */
interface CustomizedUserRepository extends CustomizedRepository<User> {

    Page<RowUser> list(UserFilter filter, Pageable pageable);
}
