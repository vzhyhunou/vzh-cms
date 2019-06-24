package vzh.cms.handler;

import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeDelete;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.stereotype.Component;
import vzh.cms.model.Content;
import vzh.cms.repository.FileRepository;

/**
 * @author Viktar Zhyhunou
 */
@Component
@RepositoryEventHandler(Content.class)
public class ContentEventHandler {

    private FileRepository repository;

    public ContentEventHandler(FileRepository repository) {
        this.repository = repository;
    }

    @HandleBeforeCreate
    @HandleBeforeSave
    public void save(Content content) throws Exception {
        repository.save(content);
    }

    @HandleBeforeDelete
    public void delete(Content content) throws Exception {
        content.getFiles().clear();
        repository.clean(content);
    }
}
