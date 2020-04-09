package vzh.cms.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import vzh.cms.config.property.CmsImportProperties;
import vzh.cms.config.property.CmsProperties;
import vzh.cms.model.Content;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * @author Viktar Zhyhunou
 */
@Service
public class ImportService {

    private static final Logger LOG = LoggerFactory.getLogger(ImportService.class);

    private CmsImportProperties properties;

    private FileService fileService;

    private EntityManager manager;

    private ObjectMapper mapper;

    public ImportService(CmsProperties properties, FileService fileService, EntityManager manager, ObjectMapper mapper) {
        this.properties = properties.getImp();
        this.fileService = fileService;
        this.manager = manager;
        this.mapper = mapper;
    }

    @Transactional
    public void imp() throws Exception {

        Path path = Paths.get(properties.getPath());
        if (Files.exists(path)) {
            try (DirectoryStream<Path> pathStream = Files.newDirectoryStream(path)) {
                for (Path dir : pathStream) {
                    Class<?> type = Class.forName(dir.toFile().getName());
                    try (DirectoryStream<Path> dirStream = Files.newDirectoryStream(dir)) {
                        for (Path file : dirStream) {
                            LOG.info("Import: {}", file);
                            Object entity = mapper.readValue(file.toFile(), type);
                            manager.persist(entity);
                            if (entity instanceof Content) {
                                fileService.save((Content) entity);
                            }
                        }
                    }
                }
            }
        }
    }
}
