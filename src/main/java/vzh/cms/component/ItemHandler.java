package vzh.cms.component;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.*;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import vzh.cms.model.Base64File;
import vzh.cms.model.Item;
import vzh.cms.model.User;
import vzh.cms.service.EntityService;
import vzh.cms.service.FileService;
import vzh.cms.service.LocationService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;

import static org.springframework.security.core.context.SecurityContextHolder.getContext;

/**
 * @author Viktar Zhyhunou
 */
@Component
@RepositoryEventHandler
@RequiredArgsConstructor
public class ItemHandler {

    private static final String OLD_LOCATION = "OLD_LOCATION";
    private static final String NEW_FILES = "NEW_FILES";

    @Autowired
    private HttpServletRequest request;

    private final FileService fileService;

    private final EntityService entityService;

    private final LocationService locationService;

    @HandleBeforeCreate
    public void beforeCreate(Item item) {
        fill(item);
    }

    @HandleAfterCreate
    public void afterCreate(Item item) throws IOException {
        if (HttpMethod.PATCH.matches(request.getMethod())) {
            return;
        }
        fileService.create(locationService.location(item), item.getFiles());
        item.getFiles().clear();
    }

    @HandleBeforeSave
    public void beforeSave(Item item) throws IOException {
        fill(item);
        if (HttpMethod.PATCH.matches(request.getMethod())) {
            return;
        }
        request.setAttribute(OLD_LOCATION, locationService.location(entityService.find(item)));
        request.setAttribute(NEW_FILES, item.getFiles());
    }

    @SuppressWarnings("unchecked")
    @HandleAfterSave
    public void afterSave(Item item) throws IOException {
        if (HttpMethod.PATCH.matches(request.getMethod())) {
            return;
        }
        fileService.update(
                (String) request.getAttribute(OLD_LOCATION),
                locationService.location(item),
                (Collection<Base64File>) request.getAttribute(NEW_FILES)
        );
        item.getFiles().clear();
    }

    @HandleAfterDelete
    public void afterDelete(Item item) throws IOException {
        fileService.clean(locationService.location(item), Collections.emptySet());
    }

    private void fill(Item item) {
        item.setDate(new Date());
        item.setUser(entityService.find(User.class, getContext().getAuthentication().getName()));
    }
}
