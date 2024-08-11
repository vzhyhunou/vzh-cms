package vzh.cms.projection;

import org.springframework.beans.factory.annotation.Value;
import vzh.cms.model.Base64File;

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

    @Value("#{@fileService.read(@locationService.location(target), false).?[#root.target.content[T(org.springframework.context.i18n.LocaleContextHolder).locale.language].contains(name)]}")
    Set<Base64File> getFiles();
}
