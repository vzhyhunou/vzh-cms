package vzh.cms.component;

import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.function.Function;

/**
 * @author Viktar Zhyhunou
 */
@Component("langPropertiesFunction")
public class LangPropertiesFunction implements Function<Map<String, ?>, Object> {

    @Override
    public Object apply(Map<String, ?> properties) {
        return properties.get(LocaleContextHolder.getLocale().getLanguage());
    }
}
