package vzh.cms.model;

import lombok.Data;

import javax.persistence.MappedSuperclass;
import java.util.Date;

/**
 * @author Viktar Zhyhunou
 */
@Data
@MappedSuperclass
abstract public class Item {

    private Date date;

    private String userId;
}
