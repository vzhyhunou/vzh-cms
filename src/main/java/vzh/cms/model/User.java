package vzh.cms.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.Size;

/**
 * @author Viktar Zhyhunou
 */
@EqualsAndHashCode(callSuper = false)
@Data
@ToString(exclude = "password")
@Entity
public class User extends Tagged<String> {

    @Id
    private String id;

    @Size(min = 5)
    private String password;
}
