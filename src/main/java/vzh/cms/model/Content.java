package vzh.cms.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.HashSet;
import java.util.Set;

/**
 * @author Viktar Zhyhunou
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class Content extends Item {

    private Set<Base64File> files = new HashSet<>();
}
