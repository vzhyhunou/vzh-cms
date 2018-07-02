package vzh.cms.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;
import org.apache.commons.io.FilenameUtils;
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

import java.io.File;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

/**
 * @author Viktar Zhyhunou
 */
@Configuration
@EnableConfigurationProperties(CmsProperties.class)
public class InitConfiguration {

    private static final Logger LOG = LoggerFactory.getLogger(InitConfiguration.class);

    @Bean
    @SuppressWarnings("unchecked")
    public CommandLineRunner init(ListableBeanFactory listableBeanFactory, CmsProperties properties) {
        return args -> {

            LOG.info("Initialization start");

            Repositories repositories = new Repositories(listableBeanFactory);
            Path path = Paths.get(properties.getInit().getPath());
            ObjectMapper mapper = new ObjectMapper();
            try (DirectoryStream<Path> directoryStream = Files.newDirectoryStream(path)) {
                for (Path p : directoryStream) {
                    File file = p.toFile();
                    Class<?> c = Class.forName(FilenameUtils.removeExtension(file.getName()));
                    CollectionType type = mapper.getTypeFactory().constructCollectionType(List.class, c);
                    Iterable values = mapper.readValue(file, type);
                    CrudRepository repository = (CrudRepository) repositories.getRepositoryFor(c);
                    repository.save(values);
                }
            }

            LOG.info("Initialization end");
        };
    }
}
