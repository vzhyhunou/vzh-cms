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
import org.springframework.stereotype.Component;
import vzh.cms.model.Base64File;
import vzh.cms.model.Item;
import vzh.cms.model.User;
import vzh.cms.service.FileService;
import vzh.cms.service.LocationService;
import vzh.cms.service.MaintainService;

import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Date;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static org.springframework.security.core.context.SecurityContextHolder.getContext;

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

    private final LocationService locationService;

    private final MaintainService maintainService;

    private final EntityManager entityManager;

    @HandleBeforeCreate
    @HandleBeforeSave
    public void before(Item item) throws IOException {
        User user = new User();
        user.setId(getContext().getAuthentication().getName());
        item.setUser(user);
        item.setDate(new Date());
        if (HttpMethod.PATCH.matches(request.getMethod())) {
            return;
        }
        Item old = find(item);
        if (old == null) {
            return;
        }

        //clean removed files
        old.getFiles().addAll(item.getFiles());
        fileService.clean(old);

        //collect old files and clean
        old.getFiles().clear();
        fileService.collect(old, true);
        Set<Base64File> files = new HashSet<>(old.getFiles());
        old.getFiles().clear();
        fileService.clean(old);

        //save new and old files
        old.getFiles().addAll(item.getFiles());
        old.getFiles().removeAll(files);
        old.getFiles().addAll(files);
    }

    @HandleAfterCreate
    @HandleAfterSave
    public void after(Item item) throws IOException {
        if (HttpMethod.PATCH.matches(request.getMethod())) {
            return;
        }
        Item i = find(item);
        i.getFiles().addAll(item.getFiles());
        fileService.save(i);
    }

    @HandleAfterDelete
    public void delete(Item item) throws IOException {
        item.getFiles().clear();
        fileService.clean(item);
    }

    private Item find(Item item) {
        entityManager.detach(item);
        return Optional.ofNullable(locationService.getIdentifier(item))
                .flatMap(id -> maintainService.getRepository(item).findById(id))
                .orElse(null);
    }
}
