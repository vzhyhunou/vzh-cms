package vzh.cms.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.AuthenticationUserDetailsService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static vzh.cms.security.AuthenticationDetailsService.PREFIX;

/**
 * @author Viktar Zhyhunou
 */
@Service
@Log4j2
public class JwtDetailsService implements AuthenticationUserDetailsService<PreAuthenticatedAuthenticationToken> {

    private JwtProperties properties;

    public JwtDetailsService(JwtProperties properties) {
        this.properties = properties;
    }

    @Override
    @SuppressWarnings("unchecked")
    public UserDetails loadUserDetails(PreAuthenticatedAuthenticationToken authentication) throws UsernameNotFoundException {

        String principal = (String) authentication.getPrincipal();
        String prefix = properties.getPrefix() + " ";
        try {
            if (principal.startsWith(prefix)) {
                Claims claims = Jwts.parser()
                        .setSigningKey(properties.getSecret().getBytes())
                        .parseClaimsJws(principal.replace(prefix, ""))
                        .getBody();
                return new User(
                        claims.getSubject(),
                        "",
                        AuthorityUtils.createAuthorityList(
                                ((List<String>) claims.get(properties.getRoles())).stream()
                                        .map(a -> PREFIX + a)
                                        .collect(Collectors.toList()).toArray(new String[]{})
                        )
                );
            }
        } catch (Exception e) {
            log.warn("User won't be authenticated: {}", e.getMessage());
        }

        log.warn("Principal '{}' won't be authenticated", principal);
        throw new BadCredentialsException(principal);
    }
}
