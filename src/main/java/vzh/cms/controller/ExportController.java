package vzh.cms.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vzh.cms.service.ExportService;

/**
 * @author Viktar Zhyhunou
 */
@RestController
@RequestMapping("export")
@RequiredArgsConstructor
public class ExportController {

    private final ExportService service;

    @GetMapping
    public void export() throws Exception {
        service.export();
    }
}
