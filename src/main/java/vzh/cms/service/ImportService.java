package vzh.cms.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import vzh.cms.config.CmsProperties;
import vzh.cms.model.Item;

import javax.annotation.PostConstruct;
import javax.persistence.PrimaryKeyJoinColumn;
import java.io.File;
import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;

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
        consume(p, f -> {
            Item item = mapperService.unlinked(f);
            if (!hasKey(item)) {
                entityService.create(item);
            }
        });
        log.info("Import linked items with id only");
        consume(p, f -> {
            Item item = mapperService.unlinked(f);
            if (hasKey(item)) {
                entityService.create(item);
            }
        });
        log.info("Import items");
        consume(p, f -> entityService.update(mapperService.resource(f)));
        log.info("Import files");
        consume(p, f -> {
            Item item = mapperService.resource(f);
            fileService.create(locationService.location(entityService.find(item)), item.getFiles());
        });
        log.info("End import");
    }

    private void consume(Path dir, Consumer consumer) throws IOException {
        try (DirectoryStream<Path> paths = Files.newDirectoryStream(dir)) {
            for (Path path : paths) {
                if (path.toFile().isDirectory()) {
                    consume(path, consumer);
                } else if (path.toString().endsWith(".json")) {
                    consumer.accept(path.toFile());
                }
            }
        }
    }

    private static boolean hasKey(Object entity) {
        return Arrays.stream(entity.getClass().getDeclaredFields())
                .anyMatch(f -> Arrays.stream(f.getDeclaredAnnotations())
                        .anyMatch(a -> a instanceof PrimaryKeyJoinColumn));
    }

    private interface Consumer {
        void accept(File f) throws IOException;
    }
}
