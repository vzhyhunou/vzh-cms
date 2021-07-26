package vzh.cms.projection;

import org.springframework.beans.factory.annotation.Value;

import java.util.Map;

/**
 * @author Viktar Zhyhunou
 */
public interface RowPage extends RowTagged {

    String getId();

    @Value("#{target.title.?[key == T(org.springframework.context.i18n.LocaleContextHolder).locale.language]}")
    Map<String, String> getTitle();
}
