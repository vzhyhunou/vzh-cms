package vzh.cms.security;

import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import vzh.cms.consumer.ActiveTagsItemConsumer;
import vzh.cms.model.Item;
import vzh.cms.model.Tag;
import vzh.cms.model.User;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

/**
 * @author Viktar Zhyhunou
 */
@Service
public class AuthenticationDetailsService implements UserDetailsService {

    private EntityManager manager;

    private ActiveTagsItemConsumer<Item> consumer;

    public AuthenticationDetailsService(EntityManager manager, ActiveTagsItemConsumer<Item> consumer) {
        this.manager = manager;
        this.consumer = consumer;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {

        User user = manager.find(User.class, id);
        if (user != null) {
            consumer.accept(user);
            return new org.springframework.security.core.userdetails.User(
                    user.getId(),
                    user.getPassword(),
                    AuthorityUtils.createAuthorityList(
                            user.getTags().stream().map(Tag::getName).toArray(String[]::new)
                    )
            );
        }

        throw new UsernameNotFoundException(id);
    }
}
