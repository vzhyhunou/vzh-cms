package vzh.cms.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.HashSet;
import java.util.Set;

/**
 * @author Viktar Zhyhunou
 */
@EqualsAndHashCode(callSuper = false)
@Data
abstract public class Storage extends Item {

    private Set<Base64File> files = new HashSet<>();
}
