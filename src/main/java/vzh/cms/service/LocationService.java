package vzh.cms.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.rest.core.mapping.ResourceMappings;
import org.springframework.data.rest.core.mapping.ResourceMetadata;
import org.springframework.stereotype.Service;
import vzh.cms.model.Item;

import javax.persistence.EntityManagerFactory;
import java.io.File;

/**
 * @author Viktar Zhyhunou
 */
@Service
@Log4j2
@RequiredArgsConstructor
public class LocationService {

    private final ResourceMappings mappings;

    private final EntityManagerFactory factory;

    public String location(Item item) {
        ResourceMetadata meta = mappings.getMetadataFor(item.getClass());
        String id = factory.getPersistenceUnitUtil().getIdentifier(item).toString();
        String path = id.replace('.', File.separatorChar);
        return new File(meta.getRel().value(), path).getPath();
    }
}
