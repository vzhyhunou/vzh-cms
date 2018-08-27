package vzh.cms.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import vzh.cms.config.property.CmsProperties;

/**
 * @author Viktar Zhyhunou
 */
@Configuration
@EnableConfigurationProperties(CmsProperties.class)
public class ApplicationConfiguration {

}
