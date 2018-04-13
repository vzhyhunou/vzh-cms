package vzh.cms.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import vzh.cms.config.property.ApplicationProperties;
import vzh.cms.model.Page;
import vzh.cms.repository.PageRepository;

import java.util.stream.IntStream;

/**
 * @author Viktar Zhyhunou
 */
@Configuration
@EnableConfigurationProperties(ApplicationProperties.class)
public class InitConfiguration {

    private static final Logger LOG = LoggerFactory.getLogger(InitConfiguration.class);

    @Bean
    public CommandLineRunner init(PageRepository pageRepository, ApplicationProperties properties) {
        return (args) -> {

            LOG.info("Initialization start");

            Page home = new Page();
            home.setId("home");
            home.setTitle("Home");
            home.setContent("Home Page");
            pageRepository.save(home);

            int count = properties.getPage().getSample().getCount();
            IntStream.range(0, count).forEach(i -> {
                Page sample = new Page();
                sample.setId(String.format("sample%03d", i));
                sample.setTitle(String.format("Sample %d", i));
                sample.setContent(String.format("Sample Page %d", i));
                pageRepository.save(sample);
            });

            LOG.info("Initialization end");
        };
    }
}
