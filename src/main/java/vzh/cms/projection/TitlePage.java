package vzh.cms.projection;

import java.util.Map;

/**
 * @author Viktar Zhyhunou
 */
public interface TitlePage {

    String getId();

    Map<String, NoContentPageProperty> getProperties();
}
