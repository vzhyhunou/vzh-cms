package vzh.cms.projection;

import org.springframework.beans.factory.annotation.Value;

/**
 * @author Viktar Zhyhunou
 */
public interface PropertyPage {

    @Value("#{target.title[T(org.springframework.context.i18n.LocaleContextHolder).locale.language]}")
    String getTitle();

    @Value("#{target.content[T(org.springframework.context.i18n.LocaleContextHolder).locale.language]}")
    String getContent();
}
