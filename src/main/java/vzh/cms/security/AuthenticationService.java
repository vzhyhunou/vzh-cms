package vzh.cms.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import vzh.cms.repository.UserRepository;

/**
 * @author Viktar Zhyhunou
 */
@Service
@Log4j2
@RequiredArgsConstructor
public class AuthenticationService implements UserDetailsService {

    private final UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        log.debug("id: {}", id);
        return repository.withActiveRoles(id).map(CmsUser::new).orElseThrow(() -> new UsernameNotFoundException(id));
    }
}
