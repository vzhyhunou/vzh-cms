package vzh.cms.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.mapping.ResourceMapping;
import org.springframework.data.rest.core.mapping.ResourceMappings;
import org.springframework.data.rest.core.mapping.ResourceMetadata;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import vzh.cms.config.property.CmsExportProperties;
import vzh.cms.config.property.CmsProperties;
import vzh.cms.model.Storage;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.stream.Collectors;

import static vzh.cms.service.ServiceHelper.pathById;

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
    @SuppressWarnings("ResultOfMethodCallIgnored")
    public void export() throws Exception {

        String path = properties.getPath();
        SimpleDateFormat sdf = new SimpleDateFormat(properties.getPattern());
        File p = new File(path, sdf.format(new Date()));
        for (Class<?> type : mappings.filter(ResourceMapping::isExported).map(ResourceMetadata::getDomainType)) {
            CrudRepository<?, ?> crudRepository = repository(type);
            File dir = new File(p, type.getCanonicalName());
            for (Object entity : crudRepository.findAll()) {
                if (entity instanceof Storage) {
                    ((Storage) entity).getFiles().addAll(fileService.collect(entity, true));
                }
                File out = new File(dir, String.format("%s.json", pathById(entity)));
                out.getParentFile().mkdirs();
                LOG.info("Export: {}", out);
                mapper.writeValue(out, entity);
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
}
