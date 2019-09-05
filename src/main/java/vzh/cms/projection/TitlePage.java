package vzh.cms.projection;

import org.springframework.beans.factory.annotation.Value;

/**
 * @author Viktar Zhyhunou
 */
public interface TitlePage {

    String getId();

    @Value("#{target.properties[T(org.springframework.context.i18n.LocaleContextHolder).locale.language].title}")
    String getTitle();
}
