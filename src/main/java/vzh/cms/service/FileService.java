package vzh.cms.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import vzh.cms.config.CmsProperties;
import vzh.cms.model.Base64File;
import vzh.cms.model.Item;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Collection;
import java.util.Set;
import java.util.stream.Collectors;

import static java.nio.file.Files.*;

/**
 * @author Viktar Zhyhunou
 */
@Service
@Log4j2
@RequiredArgsConstructor
public class FileService {

    private static final Base64.Decoder DECODER = Base64.getDecoder();
    private static final Base64.Encoder ENCODER = Base64.getEncoder();

    private final CmsProperties cmsProperties;

    private final LocationService locationService;

    private String path;

    @PostConstruct
    private void postConstruct() {
        path = cmsProperties.getFiles().getPath();
    }

    public void save(Item item) throws IOException {
        clean(item);
        Path dir = location(item);
        for (Base64File file : item.getFiles()) {
            if (file.getData() != null) {
                Path out = Paths.get(dir.toString(), file.getName());
                log.debug("Write: {}", out);
                byte[] data = DECODER.decode(file.getData());
                Files.createDirectories(out.getParent());
                Files.write(out, data);
            }
        }
    }

    public Set<Base64File> collect(Item item, boolean addFiles) throws IOException {
        Path dir = location(item);
        if (exists(dir)) {
            try (DirectoryStream<Path> paths = newDirectoryStream(dir)) {
                for (Path in : paths) {
                    Base64File file = new Base64File();
                    file.setName(in.getFileName().toString());
                    if (addFiles) {
                        log.debug("Read: {}", in);
                        byte[] data = Files.readAllBytes(in);
                        file.setData(new String(ENCODER.encode(data)));
                    }
                    item.getFiles().add(file);
                }
            }
        }
        return item.getFiles();
    }

    public void clean(Item item) throws IOException {
        Path dir = location(item);
        if (exists(dir)) {
            boolean matched = false;
            Collection<String> names = item.getFiles().stream().map(Base64File::getName).collect(Collectors.toSet());
            try (DirectoryStream<Path> paths = newDirectoryStream(dir)) {
                for (Path file : paths) {
                    if (names.contains(file.getFileName().toString())) {
                        matched = true;
                    } else {
                        delete(file);
                    }
                }
            }
            if (!matched) {
                delete(dir);
            }
        }
    }

    private Path location(Item item) {
        return Paths.get(path, locationService.location(item));
    }
}
