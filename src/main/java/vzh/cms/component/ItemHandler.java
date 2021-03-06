package vzh.cms.component;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleAfterCreate;
import org.springframework.data.rest.core.annotation.HandleAfterDelete;
import org.springframework.data.rest.core.annotation.HandleAfterSave;
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
@RequiredArgsConstructor
public class ItemHandler {

    @Autowired
    private HttpServletRequest request;

    private final FileService fileService;

    @HandleBeforeCreate
    @HandleBeforeSave
    public void before(Item item) {
        item.setUserId(SecurityContextHolder.getContext().getAuthentication().getName());
        item.setDate(new Date());
    }

    @HandleAfterCreate
    @HandleAfterSave
    public void after(Item item) throws IOException {
        if (!HttpMethod.PATCH.matches(request.getMethod())) {
            fileService.save(item);
        }
    }

    @HandleAfterDelete
    public void delete(Item item) throws IOException {
        item.getFiles().clear();
        fileService.clean(item);
    }
}
