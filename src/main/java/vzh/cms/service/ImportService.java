package vzh.cms.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import vzh.cms.config.property.CmsImportProperties;
import vzh.cms.config.property.CmsProperties;
import vzh.cms.model.Storage;
import vzh.cms.model.Wrapper;

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
    public void imp() throws Exception {

        Path path = Paths.get(properties.getPath());
        if (Files.exists(path)) {
            imp(path);
        }
    }

    private void imp(Path dir) throws Exception {
        try (DirectoryStream<Path> paths = Files.newDirectoryStream(dir)) {
            for (Path path : paths) {
                if (path.toFile().isDirectory()) {
                    imp(path);
                } else {
                    LOG.info("Import: {}", path);
                    Object entity = mapper.readValue(path.toFile(), Wrapper.class).getData();
                    repository(entity.getClass()).save(entity);
                    if (entity instanceof Storage) {
                        fileService.save((Storage) entity);
                    }
                }
            }
        }
    }
}
