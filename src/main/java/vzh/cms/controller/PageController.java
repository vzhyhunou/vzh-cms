package vzh.cms.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import vzh.cms.projection.NoContentPage;
import vzh.cms.model.Page;
import vzh.cms.model.PageFilter;
import vzh.cms.projection.TitlePage;
import vzh.cms.service.PageService;

import java.util.List;
import java.util.Optional;

/**
 * @author Viktar Zhyhunou
 */
@RepositoryRestController
@RequestMapping("pages")
public class PageController {

    private PageService service;

    private PagedResourcesAssembler<NoContentPage> assembler;

    public PageController(PageService service, PagedResourcesAssembler<NoContentPage> assembler) {
        this.service = service;
        this.assembler = assembler;
    }

    @ResponseBody
    @GetMapping("search/list")
    public PagedResources<Resource<NoContentPage>> list(
            PageFilter filter,
            @RequestParam String locale,
            Pageable pageable
    ) {
        return assembler.toResource(service.list(filter, locale, pageable));
    }

    @ResponseBody
    @GetMapping("search/menu")
    public List<TitlePage> menu(
            @RequestParam String locale
    ) {
        return service.menu(locale);
    }

    @ResponseBody
    @GetMapping("search/one/{id}")
    public Optional<Page> one(
            @PathVariable String id,
            @RequestParam String locale
    ) {
        return service.one(id, locale);
    }
}
