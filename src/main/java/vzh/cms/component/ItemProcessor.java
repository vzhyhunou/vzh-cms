package vzh.cms.component;

import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class ItemProcessor implements RepresentationModelProcessor<EntityModel<Item<?>>> {

    private final FileService fileService;

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
