package vzh.cms.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import vzh.cms.service.ExportService;
import vzh.cms.service.ImportService;

import java.io.IOException;

/**
 * @author Viktar Zhyhunou
 */
@Configuration
@EnableScheduling
@EnableConfigurationProperties(CmsProperties.class)
@RequiredArgsConstructor
public class CmsConfiguration {

    private final ExportService exportService;

    @Bean
    public CommandLineRunner init(ImportService importService) {
        return args -> importService.imp();
    }

    @Scheduled(cron = "${cms.exp.full.cron}")
    public void full() throws IOException {
        exportService.export(false);
    }

    @Scheduled(cron = "${cms.exp.inc.cron}")
    public void inc() throws IOException {
        exportService.export(true);
    }
}
