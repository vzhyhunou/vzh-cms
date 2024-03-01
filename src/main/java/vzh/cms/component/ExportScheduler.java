package vzh.cms.component;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import vzh.cms.service.ExportService;

import java.io.IOException;

/**
 * @author Viktar Zhyhunou
 */
@Component
@EnableScheduling
@RequiredArgsConstructor
public class ExportScheduler {

    private final ExportService exportService;

    @Scheduled(cron = "${cms.exp.full.cron}")
    public void full() throws IOException {
        exportService.export(false);
    }

    @Scheduled(cron = "${cms.exp.inc.cron}")
    public void inc() throws IOException {
        exportService.export(true);
    }
}
