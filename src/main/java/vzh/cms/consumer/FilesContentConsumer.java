package vzh.cms.consumer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import vzh.cms.model.Content;
import vzh.cms.repository.FileRepository;

import java.util.function.Consumer;

/**
 * @author Viktar Zhyhunou
 */
@Component
public class FilesContentConsumer<T extends Content> implements Consumer<T> {

    private static final Logger LOG = LoggerFactory.getLogger(FilesContentConsumer.class);

    private FileRepository fileRepository;

    public FilesContentConsumer(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    @Override
    public void accept(T content) {
        try {
            fileRepository.fill(content, false);
        } catch (Exception e) {
            LOG.warn("Content won't be filled: {}", e.getMessage());
        }
    }
}
