package vzh.cms.component;

import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;
import vzh.cms.model.User;
import vzh.cms.service.EntityService;

import javax.validation.Valid;

/**
 * @author Viktar Zhyhunou
 */
@Component
@Validated
@RepositoryEventHandler
@RequiredArgsConstructor
public class UserHandler {

    private final PasswordEncoder encoder;

    private final EntityService entityService;

    @HandleBeforeCreate
    public void beforeCreate(@Valid User user) {
        String password = user.getPassword();
        user.setPassword(encoder.encode(password));
    }

    @HandleBeforeSave
    public void beforeSave(@Valid User user) {
        String password = user.getPassword();
        if (password == null) {
            user.setPassword(entityService.find(user).getPassword());
        } else {
            user.setPassword(encoder.encode(password));
        }
    }
}
