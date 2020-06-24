package vzh.cms.security;

import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.stereotype.Component;

@Component
@Profile("!dev")
public class BaseConfiguration implements ServiceConfiguration {

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/import").hasRole("ADMIN")
                .antMatchers("/export").hasRole("ADMIN")
                .antMatchers("/api/pages/search/one/**").permitAll()
                .antMatchers("/api/pages/search/menu/**").permitAll()
                .antMatchers("/api/users/**").hasRole("MANAGER")
                .antMatchers("/api/pages/**").hasRole("EDITOR")
        ;
    }
}
