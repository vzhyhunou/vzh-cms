package vzh.cms.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.rest.core.mapping.ResourceMapping;
import org.springframework.data.rest.core.mapping.ResourceMappings;
import org.springframework.data.rest.core.mapping.ResourceMetadata;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import vzh.cms.config.property.CmsExportProperties;
import vzh.cms.config.property.CmsProperties;
import vzh.cms.model.Storage;
import vzh.cms.model.Wrapper;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.stream.Collectors;

import static vzh.cms.service.FileService.pathById;

/**
 * @author Viktar Zhyhunou
 */
@Service
public class ExportService extends MaintainService {

    private static final Logger LOG = LoggerFactory.getLogger(ExportService.class);

    private CmsExportProperties properties;

    private ResourceMappings mappings;

    public ExportService(CmsProperties properties, ResourceMappings mappings) {
        this.properties = properties.getExp();
        this.mappings = mappings;
    }

    @Transactional
    public void export() throws Exception {

        String path = properties.getPath();
        SimpleDateFormat sdf = new SimpleDateFormat(properties.getPattern());
        File p = new File(path, sdf.format(new Date()));
        for (ResourceMetadata meta : mappings.filter(ResourceMapping::isExported)) {
            File dir = new File(p, meta.getRel().value());
            for (Object entity : repository(meta.getDomainType()).findAll()) {
                write(new File(dir, String.format("%s.json", pathById(entity))), entity);
            }
        }

        clean();
    }

    private void clean() throws IOException {

        Path path = Paths.get(properties.getPath());
        if (Files.exists(path)) {
            long limitDelete = Files.list(path).count() - properties.getLimit();
            if (limitDelete < 1) {
                return;
            }
            for (Path p : Files.list(path).sorted().limit(limitDelete).collect(Collectors.toSet())) {
                FileSystemUtils.deleteRecursively(p);
            }
        }
    }

    @SuppressWarnings("ResultOfMethodCallIgnored")
    private void write(File file, Object entity) throws Exception {

        LOG.info("Write: {}", file);
        if (entity instanceof Storage) {
            ((Storage) entity).getFiles().addAll(fileService.collect(entity, true));
        }
        file.getParentFile().mkdirs();
        Wrapper wrapper = new Wrapper();
        wrapper.setData(entity);
        mapper.writeValue(file, wrapper);
    }
}
