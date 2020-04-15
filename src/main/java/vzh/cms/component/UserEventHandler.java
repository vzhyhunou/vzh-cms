package vzh.cms.component;

import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.validation.annotation.Validated;
import vzh.cms.model.User;

import javax.validation.Valid;
import java.util.regex.Pattern;

/**
 * @author Viktar Zhyhunou
 */
@Component
@Validated
@RepositoryEventHandler
public class UserEventHandler {

    private static final Pattern BCRYPT_PATTERN = Pattern.compile("\\A\\$2a?\\$\\d\\d\\$[./0-9A-Za-z]{53}");

    private PasswordEncoder encoder;

    public UserEventHandler(PasswordEncoder encoder) {
        this.encoder = encoder;
    }

    @HandleBeforeCreate
    @HandleBeforeSave
    public void apply(@Valid User user) {
        String password = user.getPassword();
        if (!BCRYPT_PATTERN.matcher(password).matches()) {
            user.setPassword(encoder.encode(password));
        }
    }
}
