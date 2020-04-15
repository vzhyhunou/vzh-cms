package vzh.cms.component;

import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeDelete;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;
import vzh.cms.model.Content;
import vzh.cms.service.FileService;

/**
 * @author Viktar Zhyhunou
 */
@Component
@RepositoryEventHandler
public class ContentEventHandler {

    private FileService fileService;

    public ContentEventHandler(FileService fileService) {
        this.fileService = fileService;
    }

    @HandleBeforeCreate
    @HandleBeforeSave
    public void save(Content content) throws Exception {
        fileService.save(content);
    }

    @HandleBeforeDelete
    public void delete(Content content) throws Exception {
        content.getFiles().clear();
        fileService.clean(content);
    }
}
