package vzh.cms.projection;

import vzh.cms.model.Tag;

import java.util.Set;

/**
 * @author Viktar Zhyhunou
 */
public interface RowUser {

    String getId();

    Set<Tag> getTags();
}
