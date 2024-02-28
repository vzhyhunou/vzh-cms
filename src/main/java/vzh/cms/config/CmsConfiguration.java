package vzh.cms.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.introspect.AnnotatedMember;
import com.fasterxml.jackson.databind.introspect.JacksonAnnotationIntrospector;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import vzh.cms.model.ExportIgnore;

/**
 * @author Viktar Zhyhunou
 */
@Configuration
@EnableConfigurationProperties(CmsProperties.class)
public class CmsConfiguration {

    @Bean
    public ObjectMapper exportObjectMapper(Jackson2ObjectMapperBuilder builder) {
        return builder.annotationIntrospector(new JacksonAnnotationIntrospector() {
            @Override
            public boolean hasIgnoreMarker(AnnotatedMember m) {
                return super.hasIgnoreMarker(m) || _findAnnotation(m, ExportIgnore.class) != null;
            }
        }).build();
    }
}
