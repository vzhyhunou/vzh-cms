package vzh.cms.model;

import lombok.Data;

import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;
import java.util.HashSet;
import java.util.Set;

/**
 * @author Viktar Zhyhunou
 */
@Data
@MappedSuperclass
public class Content {

    @Id
    private String id;

    @Transient
    private Set<Base64File> files = new HashSet<>();
}
