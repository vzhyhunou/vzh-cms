package vzh.cms.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.AuthenticationUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

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
            String token = principal.substring(prefix.length());
            CmsClaims claims = tokenService.extractClaims(token);
            log.debug("claims: {}", claims);
            return new CmsUser(claims);
        } catch (Exception e) {
            log.debug("Principal '{}' won't be authenticated: {}", principal, e.getMessage());
            throw new BadCredentialsException(principal, e);
        }
    }
}
