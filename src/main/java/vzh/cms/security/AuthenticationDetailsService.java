package vzh.cms.security;

import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import vzh.cms.model.User;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.Set;

/**
 * @author Viktar Zhyhunou
 */
@Service
public class AuthenticationDetailsService implements UserDetailsService {

    private EntityManager manager;

    public AuthenticationDetailsService(EntityManager manager) {
        this.manager = manager;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {

        User user = manager.find(User.class, id);
        if (user != null) {
            Set<String> tags = user.getTags();
            return new org.springframework.security.core.userdetails.User(
                    user.getId(),
                    user.getPassword(),
                    AuthorityUtils.createAuthorityList(tags.toArray(new String[tags.size()]))
            );
        }

        throw new UsernameNotFoundException(id);
    }
}
