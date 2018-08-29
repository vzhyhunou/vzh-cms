package vzh.cms.model;

import java.util.Map;

/**
 * @author Viktar Zhyhunou
 */
public interface NoContentPage {

    String getId();

    Map<String, NoContentPageProperty> getProperties();
}
