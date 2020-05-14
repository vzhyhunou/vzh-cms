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
            try (DirectoryStream<Path> paths = Files.newDirectoryStream(path)) {
                for (Path dir : paths) {
                    Class<Object> type = (Class<Object>) Class.forName(dir.toFile().getName());
                    CrudRepository<Object, ?> crudRepository = repository(type);
                    imp(crudRepository, type, dir);
                }
            }
        }
    }

    private void imp(CrudRepository<Object, ?> crudRepository, Class<Object> type, Path dir) throws Exception {
        try (DirectoryStream<Path> paths = Files.newDirectoryStream(dir)) {
            for (Path path : paths) {
                if (path.toFile().isDirectory()) {
                    imp(crudRepository, type, path);
                } else {
                    LOG.info("Import: {}", path);
                    Object entity = mapper.readValue(path.toFile(), type);
                    crudRepository.save(entity);
                    if (entity instanceof Content) {
                        fileService.save((Content) entity);
                    }
                }
            }
        }
    }
}
