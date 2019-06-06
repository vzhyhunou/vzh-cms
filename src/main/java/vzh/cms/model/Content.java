package vzh.cms.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.CollectionTable;
import javax.persistence.ElementCollection;
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
abstract public class Content<P> extends Item {

    private Set<Base64File> files = new HashSet<>();

    @ElementCollection
    @MapKeyColumn(name = "locale", length = 2)
    @CollectionTable
    private Map<String, P> properties = new HashMap<>();
}
