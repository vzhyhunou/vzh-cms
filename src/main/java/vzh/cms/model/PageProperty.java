package vzh.cms.model;

import lombok.Data;

import javax.persistence.Embeddable;

/**
 * @author Viktar Zhyhunou
 */
@Data
@Embeddable
public class PageProperty {

    private String title;

    private String content;
}
