package vzh.cms.projection;

import java.util.Set;

/**
 * @author Viktar Zhyhunou
 */
public interface RowTagged {

    Set<Tag> getTags();

    interface Tag {
        String getName();
    }
}
