package vzh.cms.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import vzh.cms.service.ExportService;

/**
 * @author Viktar Zhyhunou
 */
@Configuration
@EnableScheduling
public class ExportConfiguration {

    private ExportService service;

    public ExportConfiguration(ExportService service) {
        this.service = service;
    }

    @Scheduled(cron = "${cms.exp.cron}")
    public void export() throws Exception {

        service.export();
    }
}
