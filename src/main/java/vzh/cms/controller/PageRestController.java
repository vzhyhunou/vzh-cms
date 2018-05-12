package vzh.cms.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import vzh.cms.model.Page;
import vzh.cms.service.PageService;

/**
 * @author Viktar Zhyhunou
 */
@RepositoryRestController
public class PageRestController {

    private PageService service;

    private PagedResourcesAssembler<Page> assembler;

    public PageRestController(PageService service, PagedResourcesAssembler<Page> assembler) {
        this.service = service;
        this.assembler = assembler;
    }

    @ResponseBody
    @GetMapping("/pages/search/filter")
    public PagedResources<Resource<Page>> filter(@RequestParam(defaultValue = "", required = false) String id, @RequestParam String locale, Pageable pageable) {

        org.springframework.data.domain.Page<Page> data = service.filter(id, locale, pageable);
        return assembler.toResource(data);
    }

    @ResponseBody
    @GetMapping("/pages/search/one/{id}")
    public Page one(@PathVariable String id, @RequestParam String locale) {

        return service.one(id, locale);
    }
}
