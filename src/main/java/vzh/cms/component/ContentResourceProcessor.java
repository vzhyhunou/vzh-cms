package vzh.cms.component;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceProcessor;
import org.springframework.stereotype.Component;
import vzh.cms.model.Content;
import vzh.cms.service.FileService;

/**
 * @author Viktar Zhyhunou
 */
@Component
public class ContentResourceProcessor implements ResourceProcessor<Resource<Content>> {

    private FileService fileService;

    public ContentResourceProcessor(FileService fileService) {
        this.fileService = fileService;
    }

    @Override
    public Resource<Content> process(Resource<Content> resource) {
        try {
            fileService.fill(resource.getContent(), false);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return resource;
    }
}
