package vzh.cms.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.MapKeyColumn;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Viktar Zhyhunou
 */
@EqualsAndHashCode(callSuper = false, onlyExplicitlyIncluded = true)
@Data
@Entity
public class Page extends Tagged {

    @Id
    @EqualsAndHashCode.Include
    private String id;

    @ElementCollection
    @MapKeyColumn(name = "lang", length = 2)
    @CollectionTable
    private Map<String, String> title = new HashMap<>();

    @ElementCollection
    @MapKeyColumn(name = "lang", length = 2)
    @CollectionTable
    @Column(columnDefinition = "TEXT")
    private Map<String, String> content = new HashMap<>();
}
