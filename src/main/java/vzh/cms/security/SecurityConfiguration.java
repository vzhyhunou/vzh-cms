package vzh.cms.security;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.AuthenticationUserDetailsService;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationProvider;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.security.web.authentication.preauth.RequestHeaderAuthenticationFilter;

import javax.servlet.Filter;
import javax.servlet.http.HttpServletResponse;

import static vzh.cms.model.User.PASSWORD_ENCODER;

/**
 * @author Viktar Zhyhunou
 */
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableConfigurationProperties(JwtProperties.class)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    private UserDetailsService userDetailsService;

    private AuthenticationUserDetailsService<PreAuthenticatedAuthenticationToken> jwtDetailsService;

    private JwtProperties properties;

    public SecurityConfiguration(UserDetailsService userDetailsService,
                                 AuthenticationUserDetailsService<PreAuthenticatedAuthenticationToken> jwtDetailsService,
                                 JwtProperties properties) {
        this.userDetailsService = userDetailsService;
        this.jwtDetailsService = jwtDetailsService;
        this.properties = properties;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.headers().frameOptions().sameOrigin();
        http
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .exceptionHandling().authenticationEntryPoint((req, rsp, e) -> rsp.sendError(HttpServletResponse.SC_UNAUTHORIZED))
                .and()
                .antMatcher("/login")
                .addFilter(jwtAuthenticationFilter())
                .antMatcher("/**")
                .addFilter(headerAuthenticationFilter())
        ;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(PASSWORD_ENCODER);
        auth.authenticationProvider(jwtAuthenticationProvider());
    }

    private Filter jwtAuthenticationFilter() throws Exception {
        AbstractAuthenticationProcessingFilter filter = new JwtAuthenticationFilter(properties);
        filter.setAuthenticationManager(authenticationManager());
        return filter;
    }

    private Filter headerAuthenticationFilter() throws Exception {
        RequestHeaderAuthenticationFilter filter = new RequestHeaderAuthenticationFilter();
        filter.setPrincipalRequestHeader(properties.getHeader());
        filter.setAuthenticationManager(authenticationManager());
        filter.setExceptionIfHeaderMissing(false);
        return filter;
    }

    private AuthenticationProvider jwtAuthenticationProvider() {
        PreAuthenticatedAuthenticationProvider provider = new PreAuthenticatedAuthenticationProvider();
        provider.setPreAuthenticatedUserDetailsService(jwtDetailsService);
        return provider;
    }
}
