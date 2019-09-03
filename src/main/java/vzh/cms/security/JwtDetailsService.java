package vzh.cms.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.AuthenticationUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Viktar Zhyhunou
 */
@Service
public class JwtDetailsService implements AuthenticationUserDetailsService<PreAuthenticatedAuthenticationToken> {

    private static final Logger LOG = LoggerFactory.getLogger(JwtDetailsService.class);

    private JwtProperties properties;

    public JwtDetailsService(JwtProperties properties) {
        this.properties = properties;
    }

    @Override
    public UserDetails loadUserDetails(PreAuthenticatedAuthenticationToken authentication) throws UsernameNotFoundException {

        String principal = (String) authentication.getPrincipal();
        String prefix = properties.getPrefix() + " ";
        try {
            if (principal.startsWith(prefix)) {
                Claims claims = Jwts.parser()
                        .setSigningKey(properties.getSecret().getBytes())
                        .parseClaimsJws(principal.replace(prefix, ""))
                        .getBody();
                @SuppressWarnings("unchecked")
                List<String> authorities = (List<String>) claims.get("roles");
                return new org.springframework.security.core.userdetails.User(
                        claims.getSubject(),
                        "",
                        AuthorityUtils.createAuthorityList(authorities.toArray(new String[]{}))
                );
            }
        } catch (Exception e) {
            LOG.warn("User won't be authenticated: {}", e.getMessage());
        }

        LOG.warn("Principal '{}' won't be authenticated", principal);
        throw new BadCredentialsException(principal);
    }
}
