package vzh.cms.config;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.introspect.Annotated;
import com.fasterxml.jackson.databind.introspect.AnnotatedMember;
import com.fasterxml.jackson.databind.introspect.JacksonAnnotationIntrospector;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import vzh.cms.model.ExportIgnore;
import vzh.cms.model.JacksonIgnore;

import java.lang.annotation.Annotation;

import static com.fasterxml.jackson.annotation.JsonProperty.Access.WRITE_ONLY;

/**
 * @author Viktar Zhyhunou
 */
@Configuration
@EnableConfigurationProperties(CmsProperties.class)
public class CmsConfiguration {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Primary
    public ObjectMapper jacksonObjectMapper(Jackson2ObjectMapperBuilder builder) {
        return annotationIntrospector(builder, JacksonIgnore.class);
    }

    @Bean
    public ObjectMapper resourceObjectMapper(Jackson2ObjectMapperBuilder builder) {
        return annotationIntrospector(builder, ExportIgnore.class);
    }

    @Bean
    public ObjectMapper unlinkedObjectMapper(Jackson2ObjectMapperBuilder builder) {
        return builder.annotationIntrospector(new JacksonAnnotationIntrospector() {
            @Override
            public boolean hasIgnoreMarker(AnnotatedMember m) {
                return super.hasIgnoreMarker(m) || _findAnnotation(m, JsonIdentityReference.class) != null;
            }
        }).build();
    }

    private <A extends Annotation> ObjectMapper annotationIntrospector(Jackson2ObjectMapperBuilder builder, Class<A> type) {
        return builder.annotationIntrospector(new JacksonAnnotationIntrospector() {
            @Override
            public JsonProperty.Access findPropertyAccess(Annotated m) {
                if (_findAnnotation(m, type) != null) {
                    return WRITE_ONLY;
                }
                return super.findPropertyAccess(m);
            }
        }).build();
    }
}
