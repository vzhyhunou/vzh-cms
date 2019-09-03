package vzh.cms.security;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * @author Viktar Zhyhunou
 */
@ConfigurationProperties("jwt")
@Data
public class JwtProperties {

    private String header;

    private String prefix;

    private int expiration;

    private String secret;

    private String roles;
}
