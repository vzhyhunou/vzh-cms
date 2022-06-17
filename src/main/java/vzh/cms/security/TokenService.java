package vzh.cms.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Date;

/**
 * @author Viktar Zhyhunou
 */
@Service
@RequiredArgsConstructor
public class TokenService {

    private final JwtProperties properties;

    private String secret;

    private long expiration;

    @PostConstruct
    private void postConstruct() {
        secret = properties.getSecret();
        expiration = properties.getExpiration() * 1000L;
    }

    public CmsClaims extractClaims(String token) {
        return new CmsClaims(parse(secret, token), properties.getRoles());
    }

    public String createToken(Claims claims) {
        long now = System.currentTimeMillis();
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + expiration))
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    private static Claims parse(String secret, String token) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
    }

    public static void main(String[] args) {
        System.out.println(parse(args[0], args[1]));
    }
}
