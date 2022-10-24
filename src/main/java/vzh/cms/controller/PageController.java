package vzh.cms.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import vzh.cms.dto.PageFilter;
import vzh.cms.projection.PropertyPage;
import vzh.cms.projection.RowPage;
import vzh.cms.projection.TitlePage;
import vzh.cms.repository.PageRepository;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

import static vzh.cms.model.UserTag.EDITOR;

/**
 * @author Viktar Zhyhunou
 */
@RepositoryRestController
@RequiredArgsConstructor
public class PageController {

    private final PageRepository repository;

    private final PagedResourcesAssembler<RowPage> assembler;

    @ResponseBody
    @GetMapping("pages/search/list")
    public PagedModel<EntityModel<RowPage>> list(PageFilter filter, Pageable pageable) {
        return assembler.toModel(repository.list(filter, pageable));
    }

    @ResponseBody
    @GetMapping("pages/search/menu")
    public List<TitlePage> menu() {
        return repository.menu();
    }

    @ResponseBody
    @GetMapping("pages/search/one/{id:.+}")
    public Optional<PropertyPage> one(@PathVariable String id, HttpServletRequest request) {
        return repository.one(id, request.isUserInRole(EDITOR.name()));
    }
}
