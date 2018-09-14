package vzh.cms.model;

import lombok.Data;

/**
 * @author Viktar Zhyhunou
 */
@Data
public class PageFilter {

    private String id;

    private String title;

    private String content;

    private String[] tags;
}
