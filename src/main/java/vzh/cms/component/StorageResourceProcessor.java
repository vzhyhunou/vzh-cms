package vzh.cms.component;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelProcessor;
import org.springframework.stereotype.Component;
import vzh.cms.model.Storage;
import vzh.cms.service.FileService;

import java.io.IOException;
import java.util.Objects;

/**
 * @author Viktar Zhyhunou
 */
@Component
public class StorageResourceProcessor implements RepresentationModelProcessor<EntityModel<Storage>> {

    private FileService service;

    public StorageResourceProcessor(FileService service) {
        this.service = service;
    }

    @Override
    public EntityModel<Storage> process(EntityModel<Storage> model) {
        Storage storage = model.getContent();
        try {
            Objects.requireNonNull(storage).getFiles().addAll(service.collect(storage, false));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return model;
    }
}
