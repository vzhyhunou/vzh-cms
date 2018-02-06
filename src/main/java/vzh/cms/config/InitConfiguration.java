package vzh.cms.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import vzh.cms.model.Page;
import vzh.cms.repository.PageRepository;

/**
 * @author Viktar Zhyhunou
 */
@Configuration
public class InitConfiguration {

    private static final Logger LOG = LoggerFactory.getLogger(InitConfiguration.class);

    @Bean
    public CommandLineRunner init(PageRepository pageRepository) {
        return (args) -> {

            LOG.info("Initialization start");

            Page page = new Page();
            page.setPath("index");
            page.setTitle("Home");
            page.setContent("Hello");
            pageRepository.save(page);

            LOG.info("Initialization end");
        };
    }
}
