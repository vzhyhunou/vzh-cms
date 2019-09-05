package vzh.cms.projection;

import org.springframework.beans.factory.annotation.Value;

import java.util.Set;

/**
 * @author Viktar Zhyhunou
 */
public interface RowPage {

    String getId();

    Set<NameTag> getTags();

    @Value("#{target.properties[T(org.springframework.context.i18n.LocaleContextHolder).locale.language]}")
    TitlePageProperty getProperty();
}
