package vzh.cms.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * @author Viktar Zhyhunou
 */
@Data
@Entity
public class Page {

    @Id
    private String id;
    private String title;
    private String content;
}
