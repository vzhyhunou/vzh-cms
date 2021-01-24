package vzh.cms.config.property;

import lombok.Data;

/**
 * @author Viktar Zhyhunou
 */
@Data
public class ExportCmsProperties {

    private String path;

    private String pattern;

    private long limit;
}
