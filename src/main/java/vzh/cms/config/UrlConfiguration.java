package vzh.cms.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.tuckey.web.filters.urlrewrite.UrlRewriteFilter;
import vzh.cms.config.property.CmsProperties;

/**
 * @author Viktar Zhyhunou
 */
@Configuration
public class UrlConfiguration {

    private static final String CONF_PATH = "confPath";

    @Bean
    public FilterRegistrationBean tuckeyRegistrationBean(CmsProperties properties) {
        FilterRegistrationBean bean = new FilterRegistrationBean();
        bean.setFilter(new UrlRewriteFilter());
        bean.addInitParameter(CONF_PATH, properties.getUrlrewrite().getPath());
        return bean;
    }
}
