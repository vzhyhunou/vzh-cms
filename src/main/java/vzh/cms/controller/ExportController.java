package vzh.cms.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import vzh.cms.service.ExportService;

import java.io.IOException;

/**
 * @author Viktar Zhyhunou
 */
@RestController
@RequestMapping("export")
@RequiredArgsConstructor
public class ExportController {

    private final ExportService service;

    @GetMapping
    public void export(@RequestParam(required = false) boolean incremental) throws IOException {
        service.export(incremental);
    }
}
