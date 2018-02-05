package vzh.cms.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

/**
 * @author Viktar Zhyhunou
 */
@Controller
public class PageController {

    @GetMapping("/")
    public String index(Map<String, Object> model) {
        return page(model, "index");
    }

    @GetMapping("/{page}")
    public String page(Map<String, Object> model, @PathVariable String page) {
        model.put("page", page);
        return "index";
    }
}
