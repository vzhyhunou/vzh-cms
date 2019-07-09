package vzh.cms.security;

import org.mockito.Mockito;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import vzh.cms.consumer.ActiveTagsItemConsumer;

/**
 * @author Viktar Zhyhunou
 */
@Configuration
public class TestConfiguration {

    @Bean
    public ActiveTagsItemConsumer activeTagsItemConsumer() {
        return Mockito.mock(ActiveTagsItemConsumer.class);
    }
}
