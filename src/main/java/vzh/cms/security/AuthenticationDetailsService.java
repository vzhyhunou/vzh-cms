package vzh.cms.security;

import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import vzh.cms.model.Tag;
import vzh.cms.repository.UserRepository;

import java.util.stream.Collectors;

/**
 * @author Viktar Zhyhunou
 */
@Service
public class AuthenticationDetailsService implements UserDetailsService {

    private static final String PREFIX = "ROLE_";

    private UserRepository repository;

    public AuthenticationDetailsService(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {

        return repository.withActiveRoles(id).map(u -> new User(
                u.getId(),
                u.getPassword(),
                AuthorityUtils.createAuthorityList(
                        u.getTags().stream()
                                .map(Tag::getName)
                                .filter(n -> n.startsWith(PREFIX))
                                .collect(Collectors.toSet())
                                .toArray(new String[]{})
                )
        )).orElseThrow(() -> new UsernameNotFoundException(id));
    }
}
