package vzh.cms.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.mapping.ResourceMappings;
import org.springframework.data.rest.core.mapping.ResourceMetadata;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import vzh.cms.config.property.CmsProperties;
import vzh.cms.config.property.ExportCmsProperties;
import vzh.cms.model.Item;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.stream.Collectors;

/**
 * @author Viktar Zhyhunou
 */
@Service
@RequiredArgsConstructor
public class ExportService {

    private final CmsProperties cmsProperties;

    private final ResourceMappings mappings;

    private final MaintainService maintainService;

    private final LocationService locationService;

    private ExportCmsProperties properties;

    @PostConstruct
    private void postConstruct() {
        properties = cmsProperties.getExp();
    }

    @Transactional
    @SuppressWarnings("unchecked")
    public void export() throws IOException {
        String date = new SimpleDateFormat(properties.getPattern()).format(new Date());
        File path = new File(properties.getPath(), date);
        for (Class<?> type : mappings.map(ResourceMetadata::getDomainType).filter(Item.class::isAssignableFrom)) {
            PagingAndSortingRepository<Item, ?> repository = maintainService.getRepository((Class<Item>) type);
            for (int i = 0; i < repository.count(); i++) {
                for (Item item : repository.findAll(PageRequest.of(i, 1))) {
                    String child = String.format("%s.json", locationService.location(item));
                    maintainService.write(new File(path, child), item);
                }
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
