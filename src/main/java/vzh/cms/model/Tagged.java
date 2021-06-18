package vzh.cms.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.MappedSuperclass;
import javax.validation.Valid;
import java.util.HashSet;
import java.util.Set;

/**
 * @author Viktar Zhyhunou
 */
@EqualsAndHashCode(callSuper = false)
@Data
@MappedSuperclass
abstract public class Tagged extends Item {

    @ElementCollection
    @Column(name = "tag")
    @CollectionTable
    @Valid
    private Set<Tag> tags = new HashSet<>();
}
