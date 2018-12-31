package vzh.cms.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.apache.commons.beanutils.BeanUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.mapping.ResourceMappings;
import org.springframework.data.rest.core.mapping.ResourceMetadata;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import vzh.cms.config.property.CmsExportProperties;
import vzh.cms.config.property.CmsProperties;
import vzh.cms.model.Content;
import vzh.cms.repository.FileRepository;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author Viktar Zhyhunou
 */
@Configuration
@EnableScheduling
public class ExportConfiguration {

    private static final Logger LOG = LoggerFactory.getLogger(ExportConfiguration.class);

    private CmsExportProperties properties;

    private FileRepository fileRepository;

    private EntityManager manager;

    private ResourceMappings mappings;

    public ExportConfiguration(CmsProperties properties, FileRepository fileRepository, EntityManager manager, ResourceMappings mappings) {
        this.properties = properties.getExport();
        this.fileRepository = fileRepository;
        this.manager = manager;
        this.mappings = mappings;
    }

    @Scheduled(cron = "${cms.export.cron}")
    @Transactional
    public void export() throws Exception {

        LOG.info("Export start");

        String path = properties.getPath();
        SimpleDateFormat sdf = new SimpleDateFormat(properties.getPattern());
        File path2 = new File(path, sdf.format(new Date()));
        ObjectMapper mapper = new ObjectMapper();
        mapper.enable(SerializationFeature.INDENT_OUTPUT);
        for (ResourceMetadata meta : mappings) {
            Class type = meta.getDomainType();
            File dir = new File(path2, type.getCanonicalName());
            dir.mkdirs();
            for (Object entity : getEntities(type)) {
                if (entity instanceof Content) {
                    fileRepository.fill((Content) entity);
                }
                String id = BeanUtils.getProperty(entity, "id");
                File out = new File(dir, String.format("%s.json", id));
                mapper.writeValue(out, entity);
            }
        }

        LOG.info("Export end");
    }

    @SuppressWarnings("unchecked")
    private Iterable getEntities(Class type) {
        CriteriaBuilder cb = manager.getCriteriaBuilder();
        CriteriaQuery cq = cb.createQuery(type);
        Root rootEntry = cq.from(type);
        CriteriaQuery all = cq.select(rootEntry);
        TypedQuery allQuery = manager.createQuery(all);
        return allQuery.getResultList();
    }
}
