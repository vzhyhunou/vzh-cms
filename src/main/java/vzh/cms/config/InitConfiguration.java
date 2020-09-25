package vzh.cms.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import vzh.cms.service.ImportService;

/**
 * @author Viktar Zhyhunou
 */
@Configuration
public class InitConfiguration {

    @Bean
    public CommandLineRunner init(ImportService service) {
        return args -> service.imp();
    }
}
