package vzh.cms.service;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import vzh.cms.config.property.CmsProperties;
import vzh.cms.model.Base64File;
import vzh.cms.model.Item;

import java.io.File;
import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Collection;
import java.util.stream.Collectors;

import static java.nio.file.Files.*;
import static org.apache.commons.io.FileUtils.readFileToByteArray;
import static org.apache.commons.io.FileUtils.writeByteArrayToFile;

/**
 * @author Viktar Zhyhunou
 */
@Service
@Log4j2
public class FileService {

    private static final Base64.Decoder DECODER = Base64.getDecoder();
    private static final Base64.Encoder ENCODER = Base64.getEncoder();

    private String path;

    private LocationService locationService;

    public FileService(CmsProperties properties, LocationService locationService) {
        this.path = properties.getFiles().getPath();
        this.locationService = locationService;
    }

    public void save(Item<?> item) throws IOException {
        clean(item);
        File dir = location(item);
        for (Base64File file : item.getFiles()) {
            if (file.getData() != null) {
                File out = new File(dir, file.getName());
                byte[] data = DECODER.decode(file.getData());
                log.debug("Write: {}", out);
                writeByteArrayToFile(out, data);
            }
        }
    }

    public void collect(Item<?> item, boolean addFiles) throws IOException {
        Path dir = Paths.get(location(item).getPath());
        if (exists(dir)) {
            try (DirectoryStream<Path> paths = newDirectoryStream(dir)) {
                for (Path file : paths) {
                    Base64File f = new Base64File();
                    f.setName(file.getFileName().toString());
                    if (addFiles) {
                        log.debug("Read: {}", file);
                        byte[] data = readFileToByteArray(file.toFile());
                        f.setData(new String(ENCODER.encode(data)));
                    }
                    item.getFiles().add(f);
                }
            }
        }
    }

    public void clean(Item<?> item) throws IOException {
        Path dir = Paths.get(location(item).getPath());
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

    private File location(Item<?> item) {
        return new File(path, locationService.location(item));
    }
}
