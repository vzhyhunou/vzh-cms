package vzh.cms.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.stereotype.Service;
import vzh.cms.config.CmsProperties;
import vzh.cms.model.Item;

import javax.annotation.PostConstruct;
import javax.persistence.Id;
import javax.persistence.PrimaryKeyJoinColumn;
import java.io.IOException;
import java.lang.reflect.Field;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.function.Consumer;

/**
 * @author Viktar Zhyhunou
 */
@Service
@Log4j2
@RequiredArgsConstructor
public class ImportService {

    private final CmsProperties cmsProperties;

    private final EntityService entityService;

    private final MapperService mapperService;

    private final LocationService locationService;

    private final FileService fileService;

    private String path;

    @PostConstruct
    private void postConstruct() {
        path = cmsProperties.getImp().getPath();
    }

    public void imp() throws IOException {
        Path p = Paths.get(path);
        if (!Files.exists(p)) {
            return;
        }
        log.info("Import not linked items with id only");
        imp(p, item -> {
            if (!isLinked(item)) {
                entityService.create(getInstanceWithId(item));
            }
        });
        log.info("Import linked items with id only");
        imp(p, item -> {
            if (isLinked(item)) {
                entityService.create(getInstanceWithId(item));
            }
        });
        log.info("Import items");
        imp(p, entityService::update);
        log.info("Import files");
        imp(p, item -> {
            Item entity = entityService.find(item);
            entity.getFiles().addAll(item.getFiles());
            try {
                fileService.create(locationService.location(entity), entity.getFiles());
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
        log.info("End import");
    }

    private void imp(Path dir, Consumer<Item> consumer) throws IOException {
        try (DirectoryStream<Path> paths = Files.newDirectoryStream(dir)) {
            for (Path path : paths) {
                if (path.toFile().isDirectory()) {
                    imp(path, consumer);
                } else {
                    consumer.accept(mapperService.read(path.toFile()));
                }
            }
        }
    }

    private static Item getInstanceWithId(Item item) {
        Item instance = BeanUtils.instantiateClass(item.getClass());
        BeanWrapperImpl src = new BeanWrapperImpl(item);
        BeanWrapperImpl dst = new BeanWrapperImpl(instance);
        Arrays.stream(item.getClass().getDeclaredFields())
                .filter(f -> Arrays.stream(f.getDeclaredAnnotations()).anyMatch(a -> a instanceof Id))
                .map(Field::getName)
                .forEach(n -> dst.setPropertyValue(n, src.getPropertyValue(n)));
        return instance;
    }

    private static boolean isLinked(Object entity) {
        return Arrays.stream(entity.getClass().getDeclaredFields())
                .anyMatch(f -> Arrays.stream(f.getDeclaredAnnotations())
                        .anyMatch(a -> a instanceof PrimaryKeyJoinColumn));
    }
}
