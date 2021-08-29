package vzh.cms.config.property;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * @author Viktar Zhyhunou
 */
@ConfigurationProperties("cms")
@Data
public class CmsProperties {

    private Import imp;

    private Export exp;

    private Files files;

    @Data
    public static class Import {

        private String path;
    }

    @Data
    public static class Export {

        private String path;

        private String pattern;

        private long limit;
    }

    @Data
    public static class Files {

        private String path;
    }
}
