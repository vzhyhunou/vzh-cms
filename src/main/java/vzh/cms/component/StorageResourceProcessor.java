package vzh.cms.component;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceProcessor;
import org.springframework.stereotype.Component;
import vzh.cms.model.Storage;
import vzh.cms.service.FileService;

/**
 * @author Viktar Zhyhunou
 */
@Component
public class StorageResourceProcessor implements ResourceProcessor<Resource<Storage>> {

    private FileService service;

    public StorageResourceProcessor(FileService service) {
        this.service = service;
    }

    @Override
    public Resource<Storage> process(Resource<Storage> resource) {
        Storage storage = resource.getContent();
        try {
            storage.getFiles().addAll(service.collect(storage, false));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return resource;
    }
}
