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
import vzh.cms.projection.PropertyPage;
import vzh.cms.projection.RowPage;
import vzh.cms.projection.TitlePage;
import vzh.cms.repository.PageRepository;

import java.util.List;
import java.util.Optional;

/**
 * @author Viktar Zhyhunou
 */
@RepositoryRestController
@RequestMapping("pages")
public class PageController {

    private PageRepository repository;

    private PagedResourcesAssembler<RowPage> assembler;

    public PageController(PageRepository repository, PagedResourcesAssembler<RowPage> assembler) {
        this.repository = repository;
        this.assembler = assembler;
    }

    @ResponseBody
    @GetMapping("search/list")
    public PagedResources<Resource<RowPage>> list(PageFilter filter, Pageable pageable) {
        return assembler.toResource(repository.list(filter, pageable));
    }

    @ResponseBody
    @GetMapping("search/menu")
    public List<TitlePage> menu() {
        return repository.listByActiveTags(TitlePage.class, "MENU");
    }

    @ResponseBody
    @GetMapping("search/one/{id}")
    public Optional<?> one(@PathVariable String id) {
        return repository.one(id, PropertyPage.class);
    }
}
