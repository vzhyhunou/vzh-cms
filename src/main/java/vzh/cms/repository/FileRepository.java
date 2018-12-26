package vzh.cms.repository;

import org.apache.commons.io.FileUtils;
import org.springframework.data.rest.core.mapping.ResourceMappings;
import org.springframework.data.rest.core.mapping.ResourceMetadata;
import org.springframework.stereotype.Repository;
import vzh.cms.config.property.CmsProperties;
import vzh.cms.model.Base64File;
import vzh.cms.model.Content;

import java.io.File;
import java.io.IOException;
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

    public void save(Content content) throws IOException {
        for (Base64File file : content.getFiles()) {
            File file2 = new File(content.getId(), file.getPath());
            ResourceMetadata meta = mappings.getMetadataFor(content.getClass());
            File file3 = new File(meta.getRel(), file2.getPath());
            File out = new File(path, file3.getPath());
            byte[] data = Base64.getDecoder().decode(file.getData());
            FileUtils.writeByteArrayToFile(out, data);
        }
    }
}
