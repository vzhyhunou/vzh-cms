package vzh.cms.config;

import org.mockito.Mockito;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import vzh.cms.service.ExportService;

/**
 * @author Viktar Zhyhunou
 */
@Configuration
public class TestConfiguration {

    @Bean
    public ExportService exportService() {
        return Mockito.mock(ExportService.class);
    }
}
