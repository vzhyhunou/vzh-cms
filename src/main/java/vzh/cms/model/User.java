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
@EqualsAndHashCode(callSuper = false, onlyExplicitlyIncluded = true)
@Data
@ToString
@Entity
public class User extends Tagged {

    @Id
    @EqualsAndHashCode.Include
    private String id;

    @ToString.Exclude
    @Size(min = 5)
    private String password;
}
