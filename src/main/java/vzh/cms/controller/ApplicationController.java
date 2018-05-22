package vzh.cms.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

/**
 * @author Viktar Zhyhunou
 */
@Controller
public class ApplicationController {

    @GetMapping("/{page:^(?!api|static).*}/**")
    public String page(Map<String, Object> model, @PathVariable String page) {
        model.put("page", page);
        return "index";
    }
}
