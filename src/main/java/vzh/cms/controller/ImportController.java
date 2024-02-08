package vzh.cms.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vzh.cms.service.ImportService;

import java.io.IOException;

/**
 * @author Viktar Zhyhunou
 */
@RestController
@RequestMapping("import")
@RequiredArgsConstructor
public class ImportController {

    private final ImportService service;

    @GetMapping
    public void imp() throws IOException {
        service.imp();
    }
}
