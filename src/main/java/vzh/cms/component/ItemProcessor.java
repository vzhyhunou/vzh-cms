package vzh.cms.component;

import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelProcessor;
import org.springframework.stereotype.Component;
import vzh.cms.model.Item;
import vzh.cms.service.FileService;
import vzh.cms.service.LocationService;

import java.io.IOException;
import java.util.Objects;

/**
 * @author Viktar Zhyhunou
 */
@Component
@RequiredArgsConstructor
public class ItemProcessor implements RepresentationModelProcessor<EntityModel<Item>> {

    private final FileService fileService;

    private final LocationService locationService;

    @Override
    public EntityModel<Item> process(EntityModel<Item> model) {
        Item item = model.getContent();
        try {
            Objects.requireNonNull(item).getFiles().addAll(fileService.read(locationService.location(item), false));
            return model;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
