package vzh.cms.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import vzh.cms.dto.UserFilter;
import vzh.cms.projection.RowUser;
import vzh.cms.repository.UserRepository;

/**
 * @author Viktar Zhyhunou
 */
@RepositoryRestController
@RequestMapping("users")
public class UserController {

    private UserRepository repository;

    private PagedResourcesAssembler<RowUser> assembler;

    public UserController(UserRepository repository, PagedResourcesAssembler<RowUser> assembler) {
        this.repository = repository;
        this.assembler = assembler;
    }

    @ResponseBody
    @GetMapping("search/list")
    public PagedModel<EntityModel<RowUser>> list(UserFilter filter, Pageable pageable) {
        return assembler.toModel(repository.list(filter, pageable));
    }
}
