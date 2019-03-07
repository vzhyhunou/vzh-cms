package vzh.cms.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vzh.cms.service.ExportService;

/**
 * @author Viktar Zhyhunou
 */
@RestController
@RequestMapping("export")
@PreAuthorize("hasRole('ROLE_ADMIN')")
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
