package vzh.cms.consumer;

import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * @author Viktar Zhyhunou
 */
@Component("langPropertiesFunction")
public class LangPropertiesFunction implements Function<Map<String, ?>, Map<String, ?>> {

    @Override
    public Map<String, ?> apply(Map<String, ?> properties) {
        properties.keySet().stream()
                .filter(k -> !k.equals(LocaleContextHolder.getLocale().getLanguage()))
                .collect(Collectors.toSet()).forEach(properties::remove);
        return properties;
    }
}
