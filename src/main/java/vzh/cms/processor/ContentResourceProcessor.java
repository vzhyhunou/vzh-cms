package vzh.cms.processor;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceProcessor;
import org.springframework.stereotype.Component;
import vzh.cms.consumer.FilesContentConsumer;
import vzh.cms.model.Content;

/**
 * @author Viktar Zhyhunou
 */
@Component
public class ContentResourceProcessor implements ResourceProcessor<Resource<Content>> {

    private FilesContentConsumer<Content> consumer;

    public ContentResourceProcessor(FilesContentConsumer<Content> consumer) {
        this.consumer = consumer;
    }

    @Override
    public Resource<Content> process(Resource<Content> resource) {
        consumer.accept(resource.getContent());
        return resource;
    }
}
