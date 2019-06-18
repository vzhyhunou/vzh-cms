package vzh.cms.model;

import lombok.Data;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.MappedSuperclass;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * @author Viktar Zhyhunou
 */
@Data
@MappedSuperclass
abstract public class Item {

    private Date date;

    private String userId;

    @ElementCollection
    @Column(name = "tag")
    @CollectionTable
    private Set<Tag> tags = new HashSet<>();
}
