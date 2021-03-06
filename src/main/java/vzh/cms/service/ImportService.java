package vzh.cms.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;
import vzh.cms.config.property.CmsProperties;
import vzh.cms.config.property.ImportCmsProperties;
import vzh.cms.model.Item;

import javax.annotation.PostConstruct;
import javax.persistence.Id;
import javax.transaction.Transactional;
import java.lang.reflect.Field;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;

/**
 * @author Viktar Zhyhunou
 */
@Service
@RequiredArgsConstructor
public class ImportService {

    private final CmsProperties cmsProperties;

    private final MaintainService maintainService;

    private final FileService fileService;

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
                    Item item = maintainService.read(path.toFile());
                    PagingAndSortingRepository<Item, ?> repository = maintainService.getRepository((Class<Item>) item.getClass());
                    if (full) {
                        Item entity = repository.save(item);
                        entity.getFiles().addAll(item.getFiles());
                        fileService.save(entity);
                    } else {
                        repository.save(getInstanceWithId(item));
                    }
                }
            }
        }
    }

    @SuppressWarnings("unchecked")
    private static Item getInstanceWithId(Item item) throws Exception {
        Item instance = ((Class<Item>) item.getClass()).newInstance();
        BeanWrapperImpl src = new BeanWrapperImpl(item);
        BeanWrapperImpl dst = new BeanWrapperImpl(instance);
        Arrays.stream(item.getClass().getDeclaredFields())
                .filter(f -> Arrays.stream(f.getDeclaredAnnotations()).anyMatch(a -> a instanceof Id))
                .map(Field::getName)
                .forEach(n -> dst.setPropertyValue(n, src.getPropertyValue(n)));
        return instance;
    }
}
