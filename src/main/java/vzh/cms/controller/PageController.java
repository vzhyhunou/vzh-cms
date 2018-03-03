package vzh.cms.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

/**
 * @author Viktar Zhyhunou
 */
@Controller
public class PageController {

    @Value("redirect:${page.home}")
    private String home;

    @GetMapping("/")
    public String index() {
        return home;
    }

    @GetMapping("/{page:^(?!api|built).*}/**")
    public String page(Map<String, Object> model, @PathVariable String page) {
        model.put("page", page);
        return "index";
    }
}
