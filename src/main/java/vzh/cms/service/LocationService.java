package vzh.cms.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.core.mapping.ResourceMappings;
import org.springframework.stereotype.Service;
import vzh.cms.model.Item;

import javax.persistence.EntityManagerFactory;
import java.util.Arrays;
import java.util.stream.Collectors;

import static java.io.File.separator;

/**
 * @author Viktar Zhyhunou
 */
@Service
@RequiredArgsConstructor
public class LocationService {

    private final ResourceMappings mappings;

    private final EntityManagerFactory factory;

    public String location(Item item) {
        String resource = mappings.getMetadataFor(item.getClass())
                .getRel()
                .value();
        String path = Arrays.stream(item.parents())
                .map(Object::toString)
                .collect(Collectors.joining(separator));
        String id = factory.getPersistenceUnitUtil()
                .getIdentifier(item)
                .toString();
        return (resource + separator + path + separator + id).replace(".", separator);
    }
}
