package vzh.cms.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import java.util.HashSet;
import java.util.Set;

/**
 * @author Viktar Zhyhunou
 */
@Data
@ToString(exclude = "password")
@Entity
public class User {

    public static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    @Id
    private String id;

    @JsonIgnore
    private String password;

    @ElementCollection
    @Column(name = "tag")
    @CollectionTable(joinColumns = @JoinColumn(name = "user_id"))
    private Set<String> tags = new HashSet<>();

    public void setPassword(String password) {
        this.password = PASSWORD_ENCODER.encode(password);
    }
}
