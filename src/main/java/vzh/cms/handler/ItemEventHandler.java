package vzh.cms.handler;

import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import vzh.cms.model.Item;

import java.util.Date;

/**
 * @author Viktar Zhyhunou
 */
@Component
@RepositoryEventHandler(Item.class)
public class ItemEventHandler {

    @HandleBeforeCreate
    @HandleBeforeSave
    public void apply(Item item) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String id = authentication.getName();
        item.setUserId(id);
        item.setDate(new Date());
    }
}
