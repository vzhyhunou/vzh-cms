package vzh.cms.repository;

import vzh.cms.model.User;

/**
 * @author Viktar Zhyhunou
 */
public interface UserRepository extends BaseRepository<User, String>, CustomizedUserRepository {
}
