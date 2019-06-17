package vzh.cms.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import java.util.regex.Pattern;

/**
 * @author Viktar Zhyhunou
 */
@EqualsAndHashCode(callSuper = false)
@Data
@ToString(exclude = "password")
@Entity
public class User extends Item {

    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    private static final Pattern BCRYPT_PATTERN = Pattern.compile("\\A\\$2a?\\$\\d\\d\\$[./0-9A-Za-z]{53}");

    @Id
    private String id;

    @NotEmpty
    private String password;

    public void setPassword(String password) {
        this.password = BCRYPT_PATTERN.matcher(password).matches() ? password : PASSWORD_ENCODER.encode(password);
    }
}
