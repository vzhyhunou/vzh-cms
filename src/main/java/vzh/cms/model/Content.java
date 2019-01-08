package vzh.cms.model;

import lombok.Data;

import java.util.HashSet;
import java.util.Set;

/**
 * @author Viktar Zhyhunou
 */
@Data
public class Content {

    private Set<Base64File> files = new HashSet<>();
}
