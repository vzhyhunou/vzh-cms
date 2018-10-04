package vzh.cms.projection;

import java.util.Map;
import java.util.Set;

/**
 * @author Viktar Zhyhunou
 */
public interface NoContentPage {

    String getId();

    Set<String> getTags();

    Map<String, NoContentPageProperty> getProperties();
}
