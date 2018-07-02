package vzh.cms.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import vzh.cms.model.Page;
import vzh.cms.model.PageFilter;
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
    @GetMapping("/pages/search/list")
    public PagedResources<Resource<Page>> list(
            PageFilter filter,
            Pageable pageable
    ) {

        return assembler.toResource(service.list(filter, pageable));
    }

    @ResponseBody
    @GetMapping("/pages/search/one/{id}/{locale}")
    public Page one(
            @PathVariable String id,
            @PathVariable String locale
    ) {

        return service.one(id, locale);
    }
}
