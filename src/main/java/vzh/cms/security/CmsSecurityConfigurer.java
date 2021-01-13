package vzh.cms.security;

import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.stereotype.Component;

@Component
@Profile("!dev")
public class CmsSecurityConfigurer implements SecurityConfigurer {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/import", "/export").hasRole("ADMIN")
                .antMatchers("/api/pages/search/one/**", "/api/pages/search/menu/**").permitAll()
                .antMatchers("/api/users/**").hasRole("MANAGER")
                .antMatchers("/api/pages/**").hasRole("EDITOR")
        ;
    }
}
