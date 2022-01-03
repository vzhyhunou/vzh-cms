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

    private byte[] secretKey;

    private long expiration;

    @PostConstruct
    private void postConstruct() {
        secretKey = properties.getSecret().getBytes();
        expiration = properties.getExpiration() * 1000L;
    }

    public Claims extractClaims(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }

    public String createToken(Claims claims) {
        long now = System.currentTimeMillis();
        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + expiration))
                .signWith(SignatureAlgorithm.HS512, secretKey)
                .compact();
    }

    public static void main(String[] args) {
        System.out.println(
                Jwts.parser()
                        .setSigningKey(args[0].getBytes())
                        .parseClaimsJws(args[1])
                        .getBody()
        );
    }
}
