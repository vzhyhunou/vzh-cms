package vzh.cms.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotBlank;
import java.util.Date;

/**
 * @author Viktar Zhyhunou
 */
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Data
@Embeddable
public class Tag {

    @EqualsAndHashCode.Include
    @NotBlank
    private String name;

    private Date start;

    private Date end;
}
