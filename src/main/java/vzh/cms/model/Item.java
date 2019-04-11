package vzh.cms.model;

import lombok.Data;

import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import java.util.Date;

/**
 * @author Viktar Zhyhunou
 */
@Data
@MappedSuperclass
public class Item {

    private Date date;

    @ManyToOne
    private User user;
}
