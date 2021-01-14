package vzh.cms.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author Viktar Zhyhunou
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class PageFilter extends TaggedFilter {

    private String id;

    private String title;

    private String content;
}
