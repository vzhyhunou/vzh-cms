package vzh.cms.component;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelProcessor;
import org.springframework.stereotype.Component;
import vzh.cms.model.Item;
import vzh.cms.service.FileService;

import java.io.IOException;
import java.util.Objects;

/**
 * @author Viktar Zhyhunou
 */
@Component
public class ItemResourceProcessor implements RepresentationModelProcessor<EntityModel<Item<?>>> {

    private FileService service;

    public ItemResourceProcessor(FileService service) {
        this.service = service;
    }

    @Override
    public EntityModel<Item<?>> process(EntityModel<Item<?>> model) {
        Item<?> item = model.getContent();
        try {
            Objects.requireNonNull(item).getFiles().addAll(service.collect(item, false));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return model;
    }
}
