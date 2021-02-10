package vzh.cms.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.CollectionTable;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.MapKeyColumn;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Viktar Zhyhunou
 */
@EqualsAndHashCode(callSuper = false, onlyExplicitlyIncluded = true)
@Data
@Entity
public class Page extends Tagged<String> implements Serializable {

    @Id
    @EqualsAndHashCode.Include
    private String id;

    @ElementCollection
    @MapKeyColumn(name = "lang", length = 2)
    @CollectionTable
    private Map<String, PageProperty> properties = new HashMap<>();
}
