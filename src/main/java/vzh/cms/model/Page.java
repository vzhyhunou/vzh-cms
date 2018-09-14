package vzh.cms.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
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
public class Page extends Content implements Localized<PageProperty> {

    @Id
    private String id;

    @ElementCollection
    @Column(name = "tag")
    @CollectionTable(joinColumns = @JoinColumn(name = "page_id"))
    private Set<String> tags = new HashSet<>();

    @ElementCollection
    @MapKeyColumn(name = "locale", length = 2)
    @CollectionTable(joinColumns = @JoinColumn(name = "page_id"))
    private Map<String, PageProperty> properties = new HashMap<>();
}
