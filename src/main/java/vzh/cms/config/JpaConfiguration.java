package vzh.cms.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import vzh.cms.model.User;

import javax.persistence.EntityManager;
import java.util.Optional;

import static org.springframework.security.core.context.SecurityContextHolder.getContext;

/**
 * @author Viktar Zhyhunou
 */
@Configuration
@EnableJpaAuditing
public class JpaConfiguration {

    @Bean
    public AuditorAware<User> auditorProvider(EntityManager em) {
        return () -> Optional.ofNullable(getContext().getAuthentication()).map(a -> em.find(User.class, a.getName()));
    }
}
