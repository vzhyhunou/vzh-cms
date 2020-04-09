package vzh.cms.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.beanutils.BeanUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.rest.core.mapping.ResourceMapping;
import org.springframework.data.rest.core.mapping.ResourceMappings;
import org.springframework.data.rest.core.mapping.ResourceMetadata;
import org.springframework.stereotype.Service;
import vzh.cms.config.property.CmsExportProperties;
import vzh.cms.config.property.CmsProperties;
import vzh.cms.model.Content;

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
@Service
public class ExportService {

    private static final Logger LOG = LoggerFactory.getLogger(ExportService.class);

    private CmsExportProperties properties;

    private FileService fileService;

    private EntityManager manager;

    private ResourceMappings mappings;

    private ObjectMapper mapper;

    public ExportService(CmsProperties properties, FileService fileService, EntityManager manager, ResourceMappings mappings, ObjectMapper mapper) {
        this.properties = properties.getExp();
        this.fileService = fileService;
        this.manager = manager;
        this.mappings = mappings;
        this.mapper = mapper;
    }

    @Transactional
    @SuppressWarnings("ResultOfMethodCallIgnored")
    public void export() throws Exception {

        String path = properties.getPath();
        SimpleDateFormat sdf = new SimpleDateFormat(properties.getPattern());
        File p = new File(path, sdf.format(new Date()));
        for (Class<?> type : mappings.filter(ResourceMapping::isExported).map(ResourceMetadata::getDomainType)) {
            File dir = new File(p, type.getCanonicalName());
            dir.mkdirs();
            for (Object entity : getEntities(type)) {
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

    private <T> Iterable<T> getEntities(Class<T> type) {
        CriteriaBuilder cb = manager.getCriteriaBuilder();
        CriteriaQuery<T> cq = cb.createQuery(type);
        Root<T> rootEntry = cq.from(type);
        CriteriaQuery<T> all = cq.select(rootEntry);
        TypedQuery<T> allQuery = manager.createQuery(all);
        return allQuery.getResultList();
    }
}
