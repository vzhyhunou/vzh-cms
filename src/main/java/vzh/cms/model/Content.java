package vzh.cms.model;

import lombok.Data;

/**
 * @author Viktar Zhyhunou
 */
@Data
public class Content {

    private Base64File[] files = new Base64File[0];
}
