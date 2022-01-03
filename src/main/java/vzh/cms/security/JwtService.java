package vzh.cms.security;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.AuthenticationUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Collection;

/**
 * @author Viktar Zhyhunou
 */
@Service
@Log4j2
@RequiredArgsConstructor
public class JwtService implements AuthenticationUserDetailsService<PreAuthenticatedAuthenticationToken> {

    private final JwtProperties properties;

    private final TokenService tokenService;

    private String prefix;

    @PostConstruct
    private void postConstruct() {
        prefix = properties.getPrefix() + " ";
    }

    @Override
    public UserDetails loadUserDetails(PreAuthenticatedAuthenticationToken authentication) throws UsernameNotFoundException {
        String principal = (String) authentication.getPrincipal();
        if (!principal.startsWith(prefix)) {
            log.debug("Principal '{}' won't be authenticated", principal);
            throw new BadCredentialsException(principal);
        }
        try {
            return createUser(principal);
        } catch (Exception e) {
            log.warn("Principal '{}' won't be authenticated: {}", principal, e.getMessage());
            throw new BadCredentialsException(principal, e);
        }
    }

    @SuppressWarnings("unchecked")
    private CmsUser createUser(String principal) {
        Claims claims = getClaims(principal);
        log.debug("claims: {}", claims);
        return new CmsUser(claims.getSubject(), (Collection<String>) claims.get(properties.getRoles()));
    }

    private Claims getClaims(String principal) {
        return tokenService.extractClaims(principal.substring(prefix.length()));
    }
}
