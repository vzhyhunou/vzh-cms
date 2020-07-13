package vzh.cms.service;

import org.springframework.beans.BeanWrapperImpl;
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
public class ImportService {

    private static final String ID = "id";

    private CmsImportProperties properties;

    private MaintainService maintainService;

    public ImportService(CmsProperties properties, MaintainService maintainService) {
        this.properties = properties.getImp();
        this.maintainService = maintainService;
    }

    @Transactional
    public void imp() throws Exception {

        Path path = Paths.get(properties.getPath());
        if (Files.exists(path)) {
            imp(path, false);
            imp(path, true);
        }
    }

    private void imp(Path dir, boolean full) throws Exception {
        try (DirectoryStream<Path> paths = Files.newDirectoryStream(dir)) {
            for (Path path : paths) {
                if (path.toFile().isDirectory()) {
                    imp(path, full);
                } else {
                    Object entity = maintainService.read(path.toFile());
                    maintainService.getRepository(entity.getClass()).save(full ? entity : getInstanceWithId(entity));
                }
            }
        }
    }

    private Object getInstanceWithId(Object entity) throws Exception {
        Object object = entity.getClass().newInstance();
        new BeanWrapperImpl(object).setPropertyValue(ID, new BeanWrapperImpl(entity).getPropertyValue(ID));
        return object;
    }
}
