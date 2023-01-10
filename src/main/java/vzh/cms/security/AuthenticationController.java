package vzh.cms.security;

import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.security.core.context.SecurityContextHolder.getContext;

/**
 * @author Viktar Zhyhunou
 */
@RestController
@RequestMapping("login")
@Log4j2
@RequiredArgsConstructor
public class AuthenticationController {

    private final JwtProperties properties;

    private final TokenService tokenService;

    @GetMapping
    public String login() {
        Claims claims = new CmsClaims(getContext().getAuthentication(), properties.getRoles());
        log.debug("claims: {}", claims);
        return tokenService.createToken(claims);
    }
}
