package vzh.cms.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
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
@Service
public class ExportService {

    private static final Logger LOG = LoggerFactory.getLogger(ExportService.class);

    private CmsExportProperties properties;

    private FileRepository fileRepository;

    private EntityManager manager;

    private ResourceMappings mappings;

    public ExportService(CmsProperties properties, FileRepository fileRepository, EntityManager manager, ResourceMappings mappings) {
        this.properties = properties.getExp();
        this.fileRepository = fileRepository;
        this.manager = manager;
        this.mappings = mappings;
    }

    @Transactional
    @SuppressWarnings("ResultOfMethodCallIgnored")
    public void export() throws Exception {

        String path = properties.getPath();
        SimpleDateFormat sdf = new SimpleDateFormat(properties.getPattern());
        File path2 = new File(path, sdf.format(new Date()));
        ObjectMapper mapper = new ObjectMapper();
        mapper.enable(SerializationFeature.INDENT_OUTPUT);
        for (Class type : mappings.filter(ResourceMapping::isExported).map(ResourceMetadata::getDomainType)) {
            File dir = new File(path2, type.getCanonicalName());
            dir.mkdirs();
            for (Object entity : getEntities(type)) {
                if (entity instanceof Content) {
                    fileRepository.fill((Content) entity);
                }
                String id = BeanUtils.getProperty(entity, "id");
                File out = new File(dir, String.format("%s.json", id));
                LOG.info("Export: {}", out);
                mapper.writeValue(out, entity);
            }
        }
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