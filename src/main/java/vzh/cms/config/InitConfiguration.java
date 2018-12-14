package vzh.cms.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import vzh.cms.config.property.CmsProperties;
import vzh.cms.model.Content;
import vzh.cms.repository.FileRepository;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * @author Viktar Zhyhunou
 */
@Configuration
public class InitConfiguration {

    private static final Logger LOG = LoggerFactory.getLogger(InitConfiguration.class);

    @Bean
    public CommandLineRunner init(CmsProperties properties, FileRepository fileRepository, EntityManager manager) {

        return new CommandLineRunner() {

            @Override
            @Transactional
            public void run(String... args) throws Exception {

                LOG.info("Initialization start");

                Path path = Paths.get(properties.getInit().getPath());
                ObjectMapper mapper = new ObjectMapper();
                if (Files.exists(path)) {
                    try (DirectoryStream<Path> pathStream = Files.newDirectoryStream(path)) {
                        for (Path dir : pathStream) {
                            Class<?> c = Class.forName(dir.toFile().getName());
                            try (DirectoryStream<Path> dirStream = Files.newDirectoryStream(dir)) {
                                for (Path file : dirStream) {
                                    Object entity = mapper.readValue(file.toFile(), c);
                                    manager.persist(entity);
                                    if (entity instanceof Content) {
                                        fileRepository.save(((Content) entity).getFiles());
                                    }
                                }
                            }
                        }
                    }
                }

                LOG.info("Initialization end");
            }
        };
    }
}
