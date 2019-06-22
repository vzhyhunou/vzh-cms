package vzh.cms.repository;

import org.springframework.data.rest.core.mapping.ResourceMappings;
import org.springframework.data.rest.core.mapping.ResourceMetadata;
import org.springframework.stereotype.Repository;
import vzh.cms.config.property.CmsProperties;
import vzh.cms.model.Base64File;
import vzh.cms.model.Content;

import java.io.File;
import java.nio.file.DirectoryStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

import static java.nio.file.Files.exists;
import static java.nio.file.Files.newDirectoryStream;
import static org.apache.commons.beanutils.BeanUtils.getProperty;
import static org.apache.commons.io.FileUtils.readFileToByteArray;
import static org.apache.commons.io.FileUtils.writeByteArrayToFile;

/**
 * @author Viktar Zhyhunou
 */
@Repository
public class FileRepository {

    private static final Base64.Decoder DECODER = Base64.getDecoder();
    private static final Base64.Encoder ENCODER = Base64.getEncoder();

    private String path;

    private ResourceMappings mappings;

    public FileRepository(CmsProperties properties, ResourceMappings mappings) {
        this.path = properties.getFiles().getPath();
        this.mappings = mappings;
    }

    public void save(Content content) throws Exception {
        File dir = location(content);
        for (Base64File file : content.getFiles()) {
            File out = new File(dir, file.getPath());
            byte[] data = DECODER.decode(file.getData());
            writeByteArrayToFile(out, data);
        }
    }

    public void fill(Content content) throws Exception {
        Path dir = Paths.get(location(content).getPath());
        if (exists(dir)) {
            try (DirectoryStream<Path> dirStream = newDirectoryStream(dir)) {
                for (Path file : dirStream) {
                    Base64File f = new Base64File();
                    f.setPath(file.getFileName().toString());
                    byte[] data = readFileToByteArray(file.toFile());
                    f.setData(new String(ENCODER.encode(data)));
                    content.getFiles().add(f);
                }
            }
        }
    }

    private File location(Object entity) throws Exception {
        ResourceMetadata meta = mappings.getMetadataFor(entity.getClass());
        String id = getProperty(entity, "id");
        File dir = new File(meta.getRel(), id);
        return new File(path, dir.getPath());
    }
}
