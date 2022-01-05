package vzh.cms.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.impl.DefaultClaims;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;

@RestController
@Log4j2
@RequiredArgsConstructor
public class AuthenticationController {

    private final JwtProperties properties;

    private final TokenService tokenService;

    @GetMapping("/api/login")
    public String login() {
        return tokenService.createToken(createClaims());
    }

    private Claims createClaims() {
        Claims claims = new DefaultClaims();
        claims.setSubject(getAuthentication().getName());
        claims.put(properties.getRoles(), getRoles());
        log.debug("claims: {}", claims);
        return claims;
    }

    private Object getRoles() {
        return getAuthentication().getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toSet());
    }

    private static Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }
}
