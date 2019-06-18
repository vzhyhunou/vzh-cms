package vzh.cms.projection;

import java.util.Map;
import java.util.Set;

/**
 * @author Viktar Zhyhunou
 */
public interface RowPage {

    String getId();

    Set<NameTag> getTags();

    Map<String, TitlePageProperty> getProperties();
}
