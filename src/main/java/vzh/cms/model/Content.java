package vzh.cms.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * @author Viktar Zhyhunou
 */
@EqualsAndHashCode(callSuper = false)
@Data
abstract public class Content extends Item {

    private Set<Base64File> files = new HashSet<>();

    abstract public Map<String, ?> getProperties();
}
