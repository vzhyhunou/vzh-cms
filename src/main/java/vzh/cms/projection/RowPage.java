package vzh.cms.projection;

import org.springframework.beans.factory.annotation.Value;

import java.util.Map;
import java.util.Set;

/**
 * @author Viktar Zhyhunou
 */
public interface RowPage {

    String getId();

    Set<NameTag> getTags();

    @Value("#{@langPropertiesFunction.apply(target.properties)}")
    Map<String, TitlePageProperty> getProperties();
}
