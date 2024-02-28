package vzh.cms.component;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import vzh.cms.config.CmsProperties;
import vzh.cms.service.ImportService;

import javax.annotation.PostConstruct;
import java.io.IOException;

/**
 * @author Viktar Zhyhunou
 */
@Component
@RequiredArgsConstructor
public class ImportInitializer {

    private final CmsProperties properties;

    private final ImportService importService;

    @PostConstruct
    public void init() throws IOException {
        if (properties.getImp().isInit()) {
            importService.imp();
        }
    }
}
