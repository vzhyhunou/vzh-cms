package vzh.cms.repository;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.io.FileUtils;
import org.springframework.data.rest.core.mapping.ResourceMappings;
import org.springframework.data.rest.core.mapping.ResourceMetadata;
import org.springframework.stereotype.Repository;
import vzh.cms.config.property.CmsProperties;
import vzh.cms.model.Base64File;
import vzh.cms.model.Content;

import java.io.File;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;

/**
 * @author Viktar Zhyhunou
 */
@Repository
public class FileRepository {

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
            byte[] data = Base64.getDecoder().decode(file.getData());
            FileUtils.writeByteArrayToFile(out, data);
        }
    }

    public void fill(Content content) throws Exception {
        Path dir = Paths.get(location(content).getPath());
        if (Files.exists(dir)) {
            try (DirectoryStream<Path> dirStream = Files.newDirectoryStream(dir)) {
                for (Path file : dirStream) {
                    Base64File f = new Base64File();
                    f.setPath(file.getFileName().toString());
                    byte[] data = FileUtils.readFileToByteArray(file.toFile());
                    f.setData(new String(Base64.getEncoder().encode(data)));
                    content.getFiles().add(f);
                }
            }
        }
    }

    private File location(Object entity) throws Exception {
        ResourceMetadata meta = mappings.getMetadataFor(entity.getClass());
        String id = BeanUtils.getProperty(entity, "id");
        File dir = new File(meta.getRel(), id);
        return new File(path, dir.getPath());
    }
}
