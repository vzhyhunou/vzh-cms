package vzh.cms.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleAfterDelete;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.http.HttpMethod;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import vzh.cms.model.Item;
import vzh.cms.service.FileService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Date;

/**
 * @author Viktar Zhyhunou
 */
@Component
@RepositoryEventHandler
public class ItemHandler {

    @Autowired
    private HttpServletRequest request;

    private FileService service;

    public ItemHandler(FileService service) {
        this.service = service;
    }

    @HandleBeforeCreate
    @HandleBeforeSave
    public void save(Item<?> item) throws IOException {
        item.setUserId(SecurityContextHolder.getContext().getAuthentication().getName());
        item.setDate(new Date());
        if (!HttpMethod.PATCH.matches(request.getMethod())) {
            service.save(item);
        }
    }

    @HandleAfterDelete
    public void delete(Item<?> item) throws IOException {
        item.getFiles().clear();
        service.clean(item);
    }
}
