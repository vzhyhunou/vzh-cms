package vzh.cms.config.property;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * @author Viktar Zhyhunou
 */
@ConfigurationProperties("cms")
@Data
public class CmsProperties {

    private CmsInitProperties init;

    private CmsFilesProperties files;
}
