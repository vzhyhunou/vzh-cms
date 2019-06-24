package vzh.cms.processor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceProcessor;
import org.springframework.stereotype.Component;
import vzh.cms.model.Content;
import vzh.cms.repository.FileRepository;

/**
 * @author Viktar Zhyhunou
 */
@Component
public class ContentResourceProcessor implements ResourceProcessor<Resource<Content>> {

    private static final Logger LOG = LoggerFactory.getLogger(ContentResourceProcessor.class);

    private FileRepository repository;

    public ContentResourceProcessor(FileRepository repository) {
        this.repository = repository;
    }

    @Override
    public Resource<Content> process(Resource<Content> resource) {
        try {
            repository.fill(resource.getContent(), false);
        } catch (Exception e) {
            LOG.warn("Content won't be filled: {}", e.getMessage());
        }
        return resource;
    }
}
