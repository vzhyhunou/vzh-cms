package vzh.cms.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import vzh.cms.dto.PageFilter;
import vzh.cms.model.Page;
import vzh.cms.projection.RowPage;
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

    private PagedResourcesAssembler<RowPage> assembler;

    public PageController(PageService service, PagedResourcesAssembler<RowPage> assembler) {
        this.service = service;
        this.assembler = assembler;
    }

    @ResponseBody
    @GetMapping("search/list")
    public PagedResources<Resource<RowPage>> list(PageFilter filter, Pageable pageable) {
        return assembler.toResource(service.list(filter, pageable));
    }

    @ResponseBody
    @GetMapping("search/menu")
    public List<TitlePage> menu() {
        return service.listByActiveTags(TitlePage.class, "MENU");
    }

    @ResponseBody
    @GetMapping("search/one/{id}")
    public Optional<Page> one(@PathVariable String id) {
        return service.one(id);
    }
}
