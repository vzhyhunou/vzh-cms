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
@EqualsAndHashCode(callSuper = false, onlyExplicitlyIncluded = true)
@Data
@ToString
@Entity
public class User extends Tagged<String> implements Serializable {

    @Id
    @EqualsAndHashCode.Include
    private String id;

    @ToString.Exclude
    @Size(min = 5)
    private String password;
}
