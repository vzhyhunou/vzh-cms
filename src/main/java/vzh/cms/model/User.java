package vzh.cms.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.Size;

/**
 * @author Viktar Zhyhunou
 */
@EqualsAndHashCode(callSuper = false, onlyExplicitlyIncluded = true)
@Data
@ToString(callSuper = true)
@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        resolver = IdResolver.class,
        property = "id",
        scope = User.class
)
public class User extends Tagged {

    @Id
    @EqualsAndHashCode.Include
    private String id;

    @Column(nullable = false)
    @ToString.Exclude
    @Size(min = 5)
    @JacksonIgnore
    private String password;
}
