package vzh.cms.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import vzh.cms.dto.PageFilter;
import vzh.cms.model.PageProperty_;
import vzh.cms.projection.PropertyPage;
import vzh.cms.projection.RowPage;
import vzh.cms.projection.TitlePage;
import vzh.cms.repository.PageRepository;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

import static vzh.cms.model.Page.Tag.MENU;
import static vzh.cms.model.Page.Tag.PUBLISHED;
import static vzh.cms.model.User.Role.EDITOR;

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
    public PagedModel<EntityModel<RowPage>> list(PageFilter filter, Pageable pageable) {
        return assembler.toModel(repository.list(filter, pageable));
    }

    @ResponseBody
    @GetMapping("search/menu")
    public List<TitlePage> menu() {
        return repository.contentsByActiveTags(TitlePage.class, PageProperty_.TITLE, PUBLISHED.name(), MENU.name());
    }

    @ResponseBody
    @GetMapping("search/one/{id:.+}")
    public Optional<PropertyPage> one(@PathVariable String id, HttpServletRequest request) {
        return request.isUserInRole(EDITOR.name())
                ? repository.contentByActiveTags(id, PropertyPage.class)
                : repository.contentByActiveTags(id, PropertyPage.class, PUBLISHED.name());
    }
}
