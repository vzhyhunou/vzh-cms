package vzh.cms.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.stream.Collectors;

import static vzh.cms.security.JwtDetailsService.PREFIX;

/**
 * @author Viktar Zhyhunou
 */
class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private JwtProperties properties;

    JwtAuthenticationFilter(JwtProperties properties) {
        this.properties = properties;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication auth)
            throws IOException, ServletException {

        long now = System.currentTimeMillis();
        String token = Jwts.builder()
                .setSubject(auth.getName())
                .claim(
                        properties.getRoles(),
                        auth.getAuthorities().stream()
                                .map(GrantedAuthority::getAuthority)
                                .map(a -> a.substring(PREFIX.length()))
                                .collect(Collectors.toList())
                )
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + properties.getExpiration() * 1000))
                .signWith(SignatureAlgorithm.HS512, properties.getSecret().getBytes())
                .compact();

        response.getWriter().print(token);
    }
}
