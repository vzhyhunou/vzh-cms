package vzh.cms.security;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.AuthenticationUserDetailsService;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationProvider;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.security.web.authentication.preauth.RequestHeaderAuthenticationFilter;

import javax.servlet.Filter;
import java.util.List;

import static javax.servlet.http.HttpServletResponse.SC_UNAUTHORIZED;

/**
 * @author Viktar Zhyhunou
 */
@Configuration
@EnableConfigurationProperties(JwtProperties.class)
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager authenticationManager,
                                           List<SecurityConfigurer> configs, JwtProperties properties)
            throws Exception {
        http
                .httpBasic()
                .authenticationEntryPoint((req, rsp, e) -> rsp.sendError(SC_UNAUTHORIZED))
                .and()
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilter(authenticationFilter(authenticationManager, properties.getHeader()))
        ;
        for (SecurityConfigurer conf : configs) {
            conf.configure(http);
        }
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http, PasswordEncoder encoder,
                                                       UserDetailsService authenticationService,
                                                       AuthenticationUserDetailsService<PreAuthenticatedAuthenticationToken> jwtService)
            throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .userDetailsService(authenticationService)
                .passwordEncoder(encoder)
                .and()
                .authenticationProvider(authenticationProvider(jwtService))
                .build();
    }

    private Filter authenticationFilter(AuthenticationManager authenticationManager, String principalRequestHeader) {
        RequestHeaderAuthenticationFilter filter = new RequestHeaderAuthenticationFilter();
        filter.setPrincipalRequestHeader(principalRequestHeader);
        filter.setAuthenticationManager(authenticationManager);
        filter.setExceptionIfHeaderMissing(false);
        return filter;
    }

    private AuthenticationProvider authenticationProvider(AuthenticationUserDetailsService<PreAuthenticatedAuthenticationToken> jwtService) {
        PreAuthenticatedAuthenticationProvider provider = new PreAuthenticatedAuthenticationProvider();
        provider.setPreAuthenticatedUserDetailsService(jwtService);
        return provider;
    }
}
