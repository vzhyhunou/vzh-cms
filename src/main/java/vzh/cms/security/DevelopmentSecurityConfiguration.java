package vzh.cms.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.AuthenticationUserDetailsService;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;

/**
 * @author Viktar Zhyhunou
 */
@Configuration
@Profile("dev")
public class DevelopmentSecurityConfiguration extends SecurityConfiguration {

    public DevelopmentSecurityConfiguration(UserDetailsService userDetailsService,
                                            AuthenticationUserDetailsService<PreAuthenticatedAuthenticationToken> jwtDetailsService,
                                            JwtProperties properties,
                                            PasswordEncoder encoder) {
        super(userDetailsService, jwtDetailsService, properties, encoder);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.headers().frameOptions().sameOrigin();
        http
                .csrf().disable()
                .antMatcher("/login").addFilter(jwtAuthenticationFilter())
                .antMatcher("/**").addFilter(headerAuthenticationFilter())
        ;
    }
}
