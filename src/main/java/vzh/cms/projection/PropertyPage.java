package vzh.cms.projection;

import org.springframework.beans.factory.annotation.Value;

import java.util.Set;

/**
 * @author Viktar Zhyhunou
 */
public interface PropertyPage {

    String getId();

    @Value("#{target.title[T(org.springframework.context.i18n.LocaleContextHolder).locale.language]}")
    String getTitle();

    @Value("#{target.content[T(org.springframework.context.i18n.LocaleContextHolder).locale.language]}")
    String getContent();

    @Value("#{@fileService.collect(target, false).![name]}")
    Set<String> getFiles();
}
