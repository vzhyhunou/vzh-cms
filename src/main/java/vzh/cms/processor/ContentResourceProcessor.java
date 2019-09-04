package vzh.cms.processor;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceProcessor;
import org.springframework.stereotype.Component;
import vzh.cms.model.Content;
import vzh.cms.component.FileRepository;

/**
 * @author Viktar Zhyhunou
 */
@Component
public class ContentResourceProcessor implements ResourceProcessor<Resource<Content>> {

    private FileRepository fileRepository;

    public ContentResourceProcessor(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    @Override
    public Resource<Content> process(Resource<Content> resource) {
        try {
            fileRepository.fill(resource.getContent(), false);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return resource;
    }
}
