package vzh.cms.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import vzh.cms.config.property.CmsProperties;
import vzh.cms.service.ExportService;
import vzh.cms.service.ImportService;

/**
 * @author Viktar Zhyhunou
 */
@Configuration
@EnableScheduling
@EnableConfigurationProperties(CmsProperties.class)
public class CmsConfiguration {

    private ExportService exportService;

    public CmsConfiguration(ExportService exportService) {
        this.exportService = exportService;
    }

    @Bean
    public CommandLineRunner init(ImportService importService) {
        return args -> importService.imp();
    }

    @Scheduled(cron = "${cms.exp.cron}")
    public void export() throws Exception {
        exportService.export();
    }
}
