package vzh.cms.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vzh.cms.service.ExportService;

/**
 * @author Viktar Zhyhunou
 */
@RestController
@RequestMapping("export")
public class ExportController {

    private ExportService service;

    public ExportController(ExportService service) {
        this.service = service;
    }

    @GetMapping
    public void export() throws Exception {
        service.export();
    }
}
