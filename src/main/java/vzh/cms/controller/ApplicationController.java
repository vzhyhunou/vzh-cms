package vzh.cms.controller;

import org.springframework.boot.autoconfigure.thymeleaf.ThymeleafProperties;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import vzh.cms.config.property.CmsProperties;

import java.net.MalformedURLException;
import java.util.Map;

/**
 * @author Viktar Zhyhunou
 */
@Controller
public class ApplicationController {

    private String prefix;

    private String suffix;

    private String def;

    public ApplicationController(ThymeleafProperties thymeleafProperties, CmsProperties cmsProperties) {
        prefix = thymeleafProperties.getPrefix();
        suffix = thymeleafProperties.getSuffix();
        def = cmsProperties.getTemplate().getDef();
    }

    @GetMapping("/{page:^(?!api|static).*}/**")
    public String page(Map<String, Object> model, @PathVariable String page) throws MalformedURLException {
        model.put("page", page);
        return new UrlResource(prefix + page + suffix).exists() ? page : def;
    }
}
