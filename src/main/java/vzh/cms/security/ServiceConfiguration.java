package vzh.cms.security;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

public interface ServiceConfiguration {

    void configure(HttpSecurity http) throws Exception;
}
