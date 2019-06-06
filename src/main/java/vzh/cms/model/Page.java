package vzh.cms.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.CollectionTable;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.MapKeyColumn;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Viktar Zhyhunou
 */
@EqualsAndHashCode(callSuper = false)
@Data
@Entity
public class Page extends Content {

    @Id
    private String id;

    @ElementCollection
    @MapKeyColumn(name = "locale", length = 2)
    @CollectionTable
    private Map<String, PageProperty> properties = new HashMap<>();
}
