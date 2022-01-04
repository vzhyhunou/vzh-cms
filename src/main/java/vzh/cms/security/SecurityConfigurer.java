package vzh.cms.security;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

/**
 * @author Viktar Zhyhunou
 */
public interface SecurityConfigurer {

    void configure(HttpSecurity http) throws Exception;
}
