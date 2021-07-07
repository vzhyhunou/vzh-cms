package vzh.cms.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vzh.cms.config.property.CmsProperties;
import vzh.cms.config.property.ImportCmsProperties;
import vzh.cms.model.Item;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * @author Viktar Zhyhunou
 */
@Service
@RequiredArgsConstructor
public class ImportService {

    private final CmsProperties cmsProperties;

    private final MaintainService maintainService;

    private ImportCmsProperties properties;

    @PostConstruct
    private void postConstruct() {
        properties = cmsProperties.getImp();
    }

    @Transactional
    public void imp() throws Exception {
        Path path = Paths.get(properties.getPath());
        if (Files.exists(path)) {
            imp(path, false);
            imp(path, true);
        }
    }

    @SuppressWarnings("unchecked")
    private void imp(Path dir, boolean full) throws Exception {
        try (DirectoryStream<Path> paths = Files.newDirectoryStream(dir)) {
            for (Path path : paths) {
                if (path.toFile().isDirectory()) {
                    imp(path, full);
                } else {
                    Item item = maintainService.read(path.toFile(), full);
                    maintainService.getRepository((Class<Item>) item.getClass()).save(item);
                }
            }
        }
    }
}
