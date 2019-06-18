package vzh.cms.model;

import lombok.Data;

import javax.persistence.Embeddable;
import javax.validation.constraints.NotEmpty;
import java.util.Date;

/**
 * @author Viktar Zhyhunou
 */
@Data
@Embeddable
public class Tag {

    @NotEmpty
    private String name;

    private Date start;

    private Date end;
}
