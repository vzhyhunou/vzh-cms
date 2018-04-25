package vzh.cms.model;

import lombok.Data;

import javax.persistence.CollectionTable;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapKeyColumn;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Viktar Zhyhunou
 */
@Data
@Entity
public class Page {

    @Id
    private String id;

    @ElementCollection
    @MapKeyColumn(name = "locale", length = 2)
    @CollectionTable(joinColumns = @JoinColumn(name = "page_id"))
    private Map<String, PageProperty> properties = new HashMap<>();
}
