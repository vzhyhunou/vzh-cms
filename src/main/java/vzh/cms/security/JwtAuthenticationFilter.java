package vzh.cms.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.impl.DefaultClaims;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final JwtProperties properties;

    private final TokenService tokenService;

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication auth)
            throws IOException {

        Claims claims = new DefaultClaims();
        claims.setSubject(auth.getName());
        claims.put(properties.getRoles(),
                auth.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList()));
        String token = tokenService.createToken(claims);

        response.getWriter().print(token);
    }
}
