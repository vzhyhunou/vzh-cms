package vzh.cms.service;

import lombok.extern.log4j.Log4j2;
import org.springframework.data.rest.core.mapping.ResourceMappings;
import org.springframework.data.rest.core.mapping.ResourceMetadata;
import org.springframework.stereotype.Service;
import vzh.cms.model.Item;

import java.io.File;

/**
 * @author Viktar Zhyhunou
 */
@Service
@Log4j2
public class LocationService {

    private ResourceMappings mappings;

    public LocationService(ResourceMappings mappings) {
        this.mappings = mappings;
    }

    public File location(Item<?> item) {
        ResourceMetadata meta = mappings.getMetadataFor(item.getClass());
        return new File(meta.getRel().value(), pathById(item));
    }

    static String pathById(Item<?> item) {
        return item.getId().toString().replace('.', File.separatorChar);
    }
}
