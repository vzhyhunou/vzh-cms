package vzh.cms.projection;

import org.springframework.beans.factory.annotation.Value;

/**
 * @author Viktar Zhyhunou
 */
public interface TitlePage {

    String getId();

    @Value("#{@langPropertiesFunction.apply(target.properties).title}")
    String getTitle();
}
