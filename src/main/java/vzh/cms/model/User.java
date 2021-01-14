package vzh.cms.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.Size;
import java.io.Serializable;

/**
 * @author Viktar Zhyhunou
 */
@EqualsAndHashCode(callSuper = false)
@Data
@ToString(exclude = "password")
@Entity
public class User extends Tagged<String> implements Serializable {

    public enum Role {
        ADMIN,
        MANAGER,
        EDITOR
    }

    @Id
    private String id;

    @Size(min = 5)
    private String password;
}
