package vzh.cms.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import vzh.cms.config.property.ApplicationProperties;
import vzh.cms.model.Page;
import vzh.cms.repository.PageRepository;

import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;

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

            Path path = Paths.get(properties.getPage().getInit().getPath());
            ObjectMapper mapper = new ObjectMapper();
            try (DirectoryStream<Path> directoryStream = Files.newDirectoryStream(path)) {
                for (Path p : directoryStream) {
                    pageRepository.save(Arrays.asList(mapper.readValue(p.toFile(), Page[].class)));
                }
            }

            LOG.info("Initialization end");
        };
    }
}
