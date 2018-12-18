package vzh.cms.repository;

import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Repository;
import vzh.cms.config.property.CmsProperties;
import vzh.cms.model.Base64File;

import java.io.File;
import java.io.IOException;
import java.util.Base64;

/**
 * @author Viktar Zhyhunou
 */
@Repository
public class FileRepository {

    private String path;

    public FileRepository(CmsProperties properties) {
        this.path = properties.getFiles().getPath();
    }

    public void save(Base64File... files) throws IOException {
        for (Base64File file : files) {
            File out = new File(path, file.getName());
            byte[] data = Base64.getDecoder().decode(file.getSrc());
            FileUtils.writeByteArrayToFile(out, data);
        }
    }
}
