package vzh.cms.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author Viktar Zhyhunou
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class UserFilter extends TaggedFilter {

    private String id;
}
