package vzh.cms.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import java.util.HashSet;
import java.util.Set;
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

    private static Pattern BCRYPT_PATTERN = Pattern.compile("\\A\\$2a?\\$\\d\\d\\$[./0-9A-Za-z]{53}");

    @Id
    private String id;

    private String password;

    @ElementCollection(fetch = FetchType.EAGER)
    @Column(name = "tag")
    @CollectionTable(joinColumns = @JoinColumn(name = "user_id"))
    private Set<String> tags = new HashSet<>();

    public void setPassword(String password) {
        this.password = BCRYPT_PATTERN.matcher(password).matches() ? password : PASSWORD_ENCODER.encode(password);
    }
}
