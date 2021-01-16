package vzh.cms.security;

import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.stereotype.Component;

import static vzh.cms.security.Role.*;

@Component
@Profile("!dev")
public class CmsSecurityConfigurer implements SecurityConfigurer {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/import", "/export").hasRole(ADMIN.name())
                .antMatchers("/api/pages/search/one/**", "/api/pages/search/menu/**").permitAll()
                .antMatchers("/api/users/**").hasRole(MANAGER.name())
                .antMatchers("/api/pages/**").hasRole(EDITOR.name())
        ;
    }
}
