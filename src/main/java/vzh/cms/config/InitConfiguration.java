package vzh.cms.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.ListableBeanFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.support.Repositories;
import vzh.cms.config.property.CmsProperties;
import vzh.cms.model.Content;
import vzh.cms.repository.FileRepository;

import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * @author Viktar Zhyhunou
 */
@Configuration
@EnableConfigurationProperties(CmsProperties.class)
public class InitConfiguration {

    private static final Logger LOG = LoggerFactory.getLogger(InitConfiguration.class);

    @Bean
    public CommandLineRunner init(ListableBeanFactory listableBeanFactory, CmsProperties properties, FileRepository fileRepository) {
        return args -> {

            LOG.info("Initialization start");

            Repositories repositories = new Repositories(listableBeanFactory);
            Path path = Paths.get(properties.getInit().getPath());
            ObjectMapper mapper = new ObjectMapper();
            try (DirectoryStream<Path> pathStream = Files.newDirectoryStream(path)) {
                for (Path dir : pathStream) {
                    Class<?> c = Class.forName(dir.toFile().getName());
                    CrudRepository repository = (CrudRepository) repositories.getRepositoryFor(c);
                    try (DirectoryStream<Path> dirStream = Files.newDirectoryStream(dir)) {
                        for (Path file : dirStream) {
                            Object entity = mapper.readValue(file.toFile(), c);
                            repository.save(entity);
                            if (entity instanceof Content) {
                                fileRepository.save(((Content) entity).getFiles());
                            }
                        }
                    }
                }
            }

            LOG.info("Initialization end");
        };
    }
}
