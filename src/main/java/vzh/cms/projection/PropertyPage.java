package vzh.cms.projection;

import org.springframework.beans.factory.annotation.Value;

/**
 * @author Viktar Zhyhunou
 */
public interface PropertyPage {

    @Value("#{@langPropertiesFunction.apply(target.properties).title}")
    String getTitle();

    @Value("#{@langPropertiesFunction.apply(target.properties).content}")
    String getContent();
}
