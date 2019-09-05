package vzh.cms.projection;

import org.springframework.beans.factory.annotation.Value;

/**
 * @author Viktar Zhyhunou
 */
public interface PropertyPage {

    @Value("#{target.properties[T(org.springframework.context.i18n.LocaleContextHolder).locale.language].title}")
    String getTitle();

    @Value("#{target.properties[T(org.springframework.context.i18n.LocaleContextHolder).locale.language].content}")
    String getContent();
}
