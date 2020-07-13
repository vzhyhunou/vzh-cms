package vzh.cms.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.data.rest.core.mapping.ResourceMappings;
import org.springframework.data.rest.core.mapping.ResourceMetadata;
import org.springframework.stereotype.Service;
import vzh.cms.config.property.CmsProperties;
import vzh.cms.model.Base64File;
import vzh.cms.model.Storage;

import java.io.File;
import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import static java.nio.file.Files.*;
import static org.apache.commons.io.FileUtils.readFileToByteArray;
import static org.apache.commons.io.FileUtils.writeByteArrayToFile;

/**
 * @author Viktar Zhyhunou
 */
@Service
public class FileService {

    private static final Logger LOG = LoggerFactory.getLogger(FileService.class);

    private static final Base64.Decoder DECODER = Base64.getDecoder();
    private static final Base64.Encoder ENCODER = Base64.getEncoder();
    private static final String ID = "id";

    private String path;

    private ResourceMappings mappings;

    public FileService(CmsProperties properties, ResourceMappings mappings) {
        this.path = properties.getFiles().getPath();
        this.mappings = mappings;
    }

    public void save(Storage storage) throws IOException {
        clean(storage);
        File dir = location(storage);
        for (Base64File file : storage.getFiles()) {
            if (file.getData() != null) {
                File out = new File(dir, file.getName());
                byte[] data = DECODER.decode(file.getData());
                LOG.debug("Write: {}", out);
                writeByteArrayToFile(out, data);
            }
        }
    }

    public Set<Base64File> collect(Object entity, boolean addFiles) throws IOException {
        Path dir = Paths.get(location(entity).getPath());
        Set<Base64File> files = new HashSet<>();
        if (exists(dir)) {
            try (DirectoryStream<Path> paths = newDirectoryStream(dir)) {
                for (Path file : paths) {
                    Base64File f = new Base64File();
                    f.setName(file.getFileName().toString());
                    if (addFiles) {
                        LOG.debug("Read: {}", file);
                        byte[] data = readFileToByteArray(file.toFile());
                        f.setData(new String(ENCODER.encode(data)));
                    }
                    files.add(f);
                }
            }
        }
        return files;
    }

    @SuppressWarnings("ConstantConditions")
    public void clean(Storage storage) throws IOException {
        Path dir = Paths.get(location(storage).getPath());
        if (exists(dir)) {
            try (DirectoryStream<Path> paths = newDirectoryStream(dir)) {
                for (Path file : paths) {
                    if (storage.getFiles().stream()
                            .map(Base64File::getName)
                            .noneMatch(file.getFileName().toString()::equals)) {
                        delete(file);
                    }
                }
            }
            if (dir.toFile().list().length == 0) {
                delete(dir);
            }
        }
    }

    private File location(Object entity) {
        ResourceMetadata meta = mappings.getMetadataFor(entity.getClass());
        File dir = new File(meta.getRel().value(), pathById(entity));
        return new File(path, dir.getPath());
    }

    static String pathById(Object entity) {
        return Objects.requireNonNull(new BeanWrapperImpl(entity).getPropertyValue(ID)).toString()
                .replace('.', File.separatorChar);
    }
}
