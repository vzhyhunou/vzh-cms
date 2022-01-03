package vzh.cms.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.impl.DefaultClaims;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.stream.Collectors;

/**
 * @author Viktar Zhyhunou
 */
@Log4j2
@RequiredArgsConstructor
class JwtFilter extends UsernamePasswordAuthenticationFilter {

    private final JwtProperties properties;

    private final TokenService tokenService;

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication auth) throws IOException {
        String token = tokenService.createToken(createClaims(auth));
        response.getWriter().print(token);
    }

    private Claims createClaims(Authentication auth) {
        Claims claims = new DefaultClaims();
        claims.setSubject(auth.getName());
        claims.put(properties.getRoles(), getRoles(auth));
        log.debug("claims: {}", claims);
        return claims;
    }

    private static Object getRoles(Authentication auth) {
        return auth.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toSet());
    }
}
