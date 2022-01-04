package vzh.cms.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import vzh.cms.model.Tag;
import vzh.cms.model.User;
import vzh.cms.service.UserService;

import java.util.Collection;
import java.util.stream.Collectors;

/**
 * @author Viktar Zhyhunou
 */
@Service
@Log4j2
@RequiredArgsConstructor
public class AuthenticationService implements UserDetailsService {

    private final UserService service;

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        log.debug("id: {}", id);
        return service.withActiveRoles(id).map(AuthenticationService::createUser)
                .orElseThrow(() -> new UsernameNotFoundException(id));
    }

    private static CmsUser createUser(User user) {
        log.debug("user: {}", user);
        return new CmsUser(user.getId(), user.getPassword(), getRoles(user.getTags()));
    }

    private static Collection<String> getRoles(Collection<Tag> tags) {
        return tags.stream().map(Tag::getName).collect(Collectors.toSet());
    }
}
