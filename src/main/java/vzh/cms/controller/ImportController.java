package vzh.cms.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vzh.cms.service.ImportService;

/**
 * @author Viktar Zhyhunou
 */
@RestController
@RequestMapping("import")
public class ImportController {

    private ImportService service;

    public ImportController(ImportService service) {
        this.service = service;
    }

    @GetMapping
    public void imp() throws Exception {
        service.imp();
    }
}
