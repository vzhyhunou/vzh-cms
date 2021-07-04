package vzh.cms.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.rest.core.mapping.ResourceMappings;
import org.springframework.stereotype.Service;
import vzh.cms.model.Item;

import javax.persistence.EntityManagerFactory;
import java.io.File;
import java.util.Arrays;
import java.util.stream.Collectors;

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
        String resource = mappings.getMetadataFor(item.getClass())
                .getRel()
                .value();
        String path = Arrays.stream(item.getParents())
                .map(Object::toString)
                .collect(Collectors.joining(File.separator));
        String id = factory.getPersistenceUnitUtil()
                .getIdentifier(item)
                .toString()
                .replace('.', File.separatorChar);
        return new File(new File(resource, path), id).getPath();
    }
}
