package vzh.cms.component;

import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeDelete;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;
import vzh.cms.model.Storage;
import vzh.cms.service.FileService;

/**
 * @author Viktar Zhyhunou
 */
@Component
@RepositoryEventHandler
public class StorageEventHandler {

    private FileService service;

    public StorageEventHandler(FileService service) {
        this.service = service;
    }

    @HandleBeforeCreate
    @HandleBeforeSave
    public void save(Storage storage) throws Exception {
        service.save(storage);
    }

    @HandleBeforeDelete
    public void delete(Storage storage) throws Exception {
        storage.getFiles().clear();
        service.clean(storage);
    }
}
