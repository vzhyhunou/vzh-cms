package vzh.cms.repository;

import vzh.cms.model.User;

import javax.persistence.EntityManager;

/**
 * @author Viktar Zhyhunou
 */
public class UserRepositoryImpl extends RepositoryImpl<User, String> {

    public UserRepositoryImpl(EntityManager manager) {
        super(User.class, manager);
    }
}
