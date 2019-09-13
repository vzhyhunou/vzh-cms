package vzh.cms.security;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import javax.servlet.Filter;

import static vzh.cms.model.User.PASSWORD_ENCODER;

/**
 * @author Viktar Zhyhunou
 */
@Configuration
@EnableConfigurationProperties(JwtProperties.class)
@Profile("dev")
public class DevelopmentSecurityConfiguration extends WebSecurityConfigurerAdapter {

    private UserDetailsService userDetailsService;

    private JwtProperties properties;

    public DevelopmentSecurityConfiguration(UserDetailsService userDetailsService,
                                            JwtProperties properties) {
        this.userDetailsService = userDetailsService;
        this.properties = properties;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.headers().frameOptions().sameOrigin();
        http
                .csrf().disable()
                .antMatcher("/login").addFilter(jwtAuthenticationFilter())
        ;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(PASSWORD_ENCODER);
    }

    private Filter jwtAuthenticationFilter() throws Exception {
        AbstractAuthenticationProcessingFilter filter = new JwtAuthenticationFilter(properties);
        filter.setAuthenticationManager(authenticationManager());
        return filter;
    }
}
