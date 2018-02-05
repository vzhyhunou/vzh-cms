package vzh.cms.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * @author Viktar Zhyhunou
 */
@Controller
public class PageController {

    @GetMapping("/")
    public String index() {
        return "index";
    }
}
