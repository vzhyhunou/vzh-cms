package vzh.cms.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;
import vzh.cms.config.property.CmsImportProperties;
import vzh.cms.config.property.CmsProperties;
import vzh.cms.model.Content;

import javax.transaction.Transactional;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * @author Viktar Zhyhunou
 */
@Service
public class ImportService extends MaintainService {

    private static final Logger LOG = LoggerFactory.getLogger(ImportService.class);

    private CmsImportProperties properties;

    public ImportService(CmsProperties properties) {
        this.properties = properties.getImp();
    }

    @Transactional
    @SuppressWarnings("unchecked")
    public void imp() throws Exception {

        Path path = Paths.get(properties.getPath());
        if (Files.exists(path)) {
            try (DirectoryStream<Path> pathStream = Files.newDirectoryStream(path)) {
                for (Path dir : pathStream) {
                    Class<Object> type = (Class<Object>) Class.forName(dir.toFile().getName());
                    CrudRepository<Object, ?> crudRepository = repository(type);
                    try (DirectoryStream<Path> dirStream = Files.newDirectoryStream(dir)) {
                        for (Path file : dirStream) {
                            LOG.info("Import: {}", file);
                            Object entity = mapper.readValue(file.toFile(), type);
                            crudRepository.save(entity);
                            if (entity instanceof Content) {
                                fileService.save((Content) entity);
                            }
                        }
                    }
                }
            }
        }
    }
}
