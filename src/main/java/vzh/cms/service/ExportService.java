package vzh.cms.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.rest.core.mapping.ResourceMappings;
import org.springframework.data.rest.core.mapping.ResourceMetadata;
import org.springframework.stereotype.Service;
import vzh.cms.config.CmsProperties;
import vzh.cms.model.Item;
import vzh.cms.repository.ItemRepository;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Comparator;
import java.util.Date;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.springframework.util.FileSystemUtils.deleteRecursively;

/**
 * @author Viktar Zhyhunou
 */
@Service
@Log4j2
@RequiredArgsConstructor
public class ExportService {

    private static final Comparator<Path> COMPARATOR = Comparator.comparing(Path::getFileName);

    private final CmsProperties cmsProperties;

    private final ResourceMappings mappings;

    private final MaintainService maintainService;

    private final LocationService locationService;

    private final FileService fileService;

    private CmsProperties.Export properties;

    private String ext;

    @PostConstruct
    private void postConstruct() {
        properties = cmsProperties.getExp();
        ext = properties.getInc().getExt();
    }

    @Transactional
    @SuppressWarnings("unchecked")
    public void export(boolean incremental) throws Exception {
        Optional<Date> last = last(incremental);
        Path dir = path(last.isPresent());
        log.info("Start export {} ...", dir);
        for (Class<?> type : mappings.map(ResourceMetadata::getDomainType).filter(Item.class::isAssignableFrom)) {
            ItemRepository<Item, ?> repository = maintainService.getRepository((Class<Item>) type);
            for (int i = 0; i < last.map(repository::countByDateGreaterThan).orElseGet(repository::count); i++) {
                PageRequest p = PageRequest.of(i, 1);
                for (Item item : last.map(l -> repository.findByDateGreaterThan(l, p)).orElseGet(() -> repository.findAll(p))) {
                    fileService.collect(item, true);
                    String file = String.format("%s.json", locationService.location(item));
                    maintainService.write(Paths.get(dir.toString(), file).toFile(), item);
                }
            }
        }
        log.info("End export");
        clean();
    }

    private void clean() throws IOException {
        log.info("Start clean ...");
        long size = listFull().count() - properties.getLimit();
        if (size > 0) {
            deleteFull(size);
            deleteIncremental();
        }
        log.info("End clean");
    }

    private Stream<Path> list() throws IOException {
        Path path = Paths.get(properties.getPath());
        return Files.exists(path) ? Files.list(path) : Stream.empty();
    }

    private Stream<Path> listFull() throws IOException {
        return list().filter(p -> !p.toFile().getName().endsWith(ext));
    }

    private void deleteFull(long size) throws IOException {
        for (Path p : listFull()
                .sorted(COMPARATOR)
                .limit(size)
                .collect(Collectors.toSet())) {
            deleteRecursively(p);
        }
    }

    private void deleteIncremental() throws IOException {
        Optional<Path> first = listFull().min(COMPARATOR);
        for (Path p : list()
                .filter(p -> first.map(f -> COMPARATOR.compare(f, p) > 0).orElse(true))
                .collect(Collectors.toSet())) {
            deleteRecursively(p);
        }
    }

    private Optional<Date> last(boolean incremental) throws Exception {
        if (!incremental) {
            return Optional.empty();
        }
        Optional<Path> last = listFull().max(COMPARATOR);
        return last.isPresent()
                ? Optional.of(new SimpleDateFormat(properties.getPattern()).parse(last.get().getFileName().toString()))
                : Optional.empty();
    }

    private Path path(boolean incremental) {
        String folder = new SimpleDateFormat(properties.getPattern()).format(new Date());
        if (incremental) {
            folder = String.format("%s.%s", folder, ext);
        }
        return Paths.get(properties.getPath(), folder);
    }
}
