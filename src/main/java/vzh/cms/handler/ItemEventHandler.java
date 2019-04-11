package vzh.cms.handler;

import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import vzh.cms.model.Item;
import vzh.cms.model.User;

import javax.persistence.EntityManager;
import java.util.Date;

/**
 * @author Viktar Zhyhunou
 */
@Component
@RepositoryEventHandler(Item.class)
public class ItemEventHandler {

    private EntityManager manager;

    public ItemEventHandler(EntityManager manager) {
        this.manager = manager;
    }

    @HandleBeforeCreate
    @HandleBeforeSave
    public void apply(Item item) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String id = authentication.getName();
        User user = manager.find(User.class, id);
        item.setUser(user);
        item.setDate(new Date());
    }
}
