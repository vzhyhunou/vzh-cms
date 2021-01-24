package vzh.cms.component;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelProcessor;
import org.springframework.stereotype.Component;
import vzh.cms.model.Item;
import vzh.cms.service.FileService;

import java.io.IOException;

/**
 * @author Viktar Zhyhunou
 */
@Component
public class ItemProcessor implements RepresentationModelProcessor<EntityModel<Item<?>>> {

    private FileService fileService;

    public ItemProcessor(FileService fileService) {
        this.fileService = fileService;
    }

    @Override
    public EntityModel<Item<?>> process(EntityModel<Item<?>> model) {
        Item<?> item = model.getContent();
        try {
            fileService.collect(item, false);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return model;
    }
}
