package vzh.cms.service;

import org.springframework.stereotype.Service;
import vzh.cms.config.property.CmsImportProperties;
import vzh.cms.config.property.CmsProperties;

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
                    Object entity = read(path.toFile());
                    getRepository(entity.getClass()).save(entity);
                }
            }
        }
    }
}
