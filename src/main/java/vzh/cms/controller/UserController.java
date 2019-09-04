package vzh.cms.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
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
    public PagedResources<Resource<RowUser>> list(UserFilter filter, Pageable pageable) {
        return assembler.toResource(repository.list(filter, pageable));
    }
}
