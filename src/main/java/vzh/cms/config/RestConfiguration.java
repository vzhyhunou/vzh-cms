package vzh.cms.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;

/**
 * @author Viktar Zhyhunou
 */
@Configuration
@RequiredArgsConstructor
public class RestConfiguration implements RepositoryRestConfigurer {

    private final EntityManager em;

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        em.getMetamodel().getEntities().forEach(e -> config.exposeIdsFor(e.getJavaType()));
        config.useHalAsDefaultJsonMediaType(false);
    }
}
