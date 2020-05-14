package vzh.cms.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.rest.core.mapping.ResourceMappings;
import org.springframework.data.rest.core.mapping.ResourceMetadata;
import org.springframework.stereotype.Service;
import vzh.cms.config.property.CmsProperties;
import vzh.cms.model.Base64File;
import vzh.cms.model.Content;

import java.io.File;
import java.nio.file.DirectoryStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.Set;

import static java.nio.file.Files.*;
import static org.apache.commons.io.FileUtils.readFileToByteArray;
import static org.apache.commons.io.FileUtils.writeByteArrayToFile;
import static vzh.cms.service.ServiceHelper.pathById;

/**
 * @author Viktar Zhyhunou
 */
@Service
public class FileService {

    private static final Logger LOG = LoggerFactory.getLogger(FileService.class);

    private static final Base64.Decoder DECODER = Base64.getDecoder();
    private static final Base64.Encoder ENCODER = Base64.getEncoder();

    private String path;

    private ResourceMappings mappings;

    public FileService(CmsProperties properties, @Lazy ResourceMappings mappings) {
        this.path = properties.getFiles().getPath();
        this.mappings = mappings;
    }

    public void save(Content content) throws Exception {
        clean(content);
        File dir = location(content);
        for (Base64File file : content.getFiles()) {
            if (file.getData() != null) {
                File out = new File(dir, file.getName());
                byte[] data = DECODER.decode(file.getData());
                LOG.debug("Write: {}", out);
                writeByteArrayToFile(out, data);
            }
        }
    }

    public Set<Base64File> fill(Content content, boolean addFiles) throws Exception {
        Path dir = Paths.get(location(content).getPath());
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
                    content.getFiles().add(f);
                }
            }
        }
        return content.getFiles();
    }

    @SuppressWarnings("ConstantConditions")
    public void clean(Content content) throws Exception {
        Path dir = Paths.get(location(content).getPath());
        if (exists(dir)) {
            try (DirectoryStream<Path> paths = newDirectoryStream(dir)) {
                for (Path file : paths) {
                    if (content.getFiles().stream()
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

    private File location(Object entity) throws Exception {
        ResourceMetadata meta = mappings.getMetadataFor(entity.getClass());
        File dir = new File(meta.getRel(), pathById(entity));
        return new File(path, dir.getPath());
    }
}
