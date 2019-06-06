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
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * @author Viktar Zhyhunou
 */
@EqualsAndHashCode(callSuper = false)
@Data
@Entity
public class Page extends Content implements Localized {

    @Id
    private String id;

    @ElementCollection
    @Column(name = "tag")
    @CollectionTable
    private Set<String> tags = new HashSet<>();

    @ElementCollection
    @MapKeyColumn(name = "locale", length = 2)
    @CollectionTable
    private Map<String, PageProperty> properties = new HashMap<>();
}
