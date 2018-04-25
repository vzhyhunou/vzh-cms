package vzh.cms.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import vzh.cms.config.property.ApplicationProperties;

import java.util.Map;

/**
 * @author Viktar Zhyhunou
 */
@Controller
public class ApplicationController {

    private final ApplicationProperties properties;

    public ApplicationController(ApplicationProperties properties) {
        this.properties = properties;
    }

    @GetMapping("/")
    public String index() {
        return properties.getPage().getHome().getResponse();
    }

    @GetMapping("/{page:^(?!api|built).*}/**")
    public String page(Map<String, Object> model, @PathVariable String page) {
        model.put("page", page);
        return "index";
    }
}
