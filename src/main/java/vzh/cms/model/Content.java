package vzh.cms.model;

import lombok.Data;

import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;

/**
 * @author Viktar Zhyhunou
 */
@Data
@MappedSuperclass
public class Content {

    @Id
    private String id;

    @Transient
    private Base64File[] files = new Base64File[0];
}
