package vzh.cms.service;

import org.apache.commons.beanutils.BeanUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.mapping.ResourceMapping;
import org.springframework.data.rest.core.mapping.ResourceMappings;
import org.springframework.data.rest.core.mapping.ResourceMetadata;
import org.springframework.stereotype.Service;
import vzh.cms.config.property.CmsExportProperties;
import vzh.cms.config.property.CmsProperties;
import vzh.cms.model.Content;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

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

    @SuppressWarnings("ResultOfMethodCallIgnored")
    public void export() throws Exception {

        String path = properties.getPath();
        SimpleDateFormat sdf = new SimpleDateFormat(properties.getPattern());
        File p = new File(path, sdf.format(new Date()));
        for (Class<?> type : mappings.filter(ResourceMapping::isExported).map(ResourceMetadata::getDomainType)) {
            CrudRepository crudRepository = repository(type);
            File dir = new File(p, type.getCanonicalName());
            dir.mkdirs();
            for (Object entity : crudRepository.findAll()) {
                if (entity instanceof Content) {
                    fileService.fill((Content) entity, true);
                }
                String id = BeanUtils.getProperty(entity, "id");
                File out = new File(dir, String.format("%s.json", id));
                LOG.info("Export: {}", out);
                mapper.writeValue(out, entity);
            }
        }
    }
}
