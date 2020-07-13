package vzh.cms.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeDelete;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import vzh.cms.model.Storage;
import vzh.cms.service.FileService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

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

    @Autowired
    private HttpServletRequest request;

    @HandleBeforeCreate
    @HandleBeforeSave
    public void save(Storage storage) throws IOException {
        if (!HttpMethod.PATCH.matches(request.getMethod())) {
            service.save(storage);
        }
    }

    @HandleBeforeDelete
    public void delete(Storage storage) throws IOException {
        storage.getFiles().clear();
        service.clean(storage);
    }
}
