package vzh.cms.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.stereotype.Service;
import vzh.cms.config.CmsProperties;
import vzh.cms.model.Item;

import javax.annotation.PostConstruct;
import javax.persistence.Id;
import javax.persistence.PrimaryKeyJoinColumn;
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
@Log4j2
@RequiredArgsConstructor
public class ImportService {

    private final CmsProperties cmsProperties;

    private final MaintainService maintainService;

    private final FileService fileService;

    private String path;

    @PostConstruct
    private void postConstruct() {
        path = cmsProperties.getImp().getPath();
    }

    @Transactional
    public void imp() throws Exception {
        Path p = Paths.get(path);
        if (Files.exists(p)) {
            for (int i = 1; i < 4; i++) {
                log.info(String.format("Start import pass %d ...", i));
                imp(p, i);
            }
            log.info("End import");
        }
    }

    private void imp(Path dir, int pass) throws Exception {
        try (DirectoryStream<Path> paths = Files.newDirectoryStream(dir)) {
            for (Path path : paths) {
                if (path.toFile().isDirectory()) {
                    imp(path, pass);
                } else {
                    Item item = maintainService.read(path.toFile());
                    switch (pass) {
                        case 1:
                            if (!isLinked(item)) {
                                maintainService.getRepository(item).save(getInstanceWithId(item));
                            }
                            break;
                        case 2:
                            if (isLinked(item)) {
                                maintainService.getRepository(item).save(getInstanceWithId(item));
                            }
                            break;
                        case 3:
                            Item entity = maintainService.getRepository(item).save(item);
                            entity.getFiles().addAll(item.getFiles());
                            fileService.save(entity);
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

    private static boolean isLinked(Object entity) {
        return Arrays.stream(entity.getClass().getDeclaredFields())
                .anyMatch(f -> Arrays.stream(f.getDeclaredAnnotations())
                        .anyMatch(a -> a instanceof PrimaryKeyJoinColumn));
    }
}
