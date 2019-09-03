package vzh.cms.repository;

import vzh.cms.model.User;

import javax.persistence.EntityManager;

/**
 * @author Viktar Zhyhunou
 */
class UserRepositoryImpl extends RepositoryImpl<User, String> {

    UserRepositoryImpl(EntityManager manager) {
        super(User.class, manager);
    }
}
