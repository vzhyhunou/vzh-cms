package vzh.cms.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedResources;
import org.springframework.hateoas.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import vzh.cms.model.User;
import vzh.cms.model.UserFilter;
import vzh.cms.service.UserService;

/**
 * @author Viktar Zhyhunou
 */
@RepositoryRestController
@RequestMapping("users")
public class UserController {

    private UserService service;

    private PagedResourcesAssembler<User> assembler;

    public UserController(UserService service, PagedResourcesAssembler<User> assembler) {
        this.service = service;
        this.assembler = assembler;
    }

    @ResponseBody
    @GetMapping("search/list")
    public PagedResources<Resource<User>> list(
            UserFilter filter,
            Pageable pageable
    ) {
        return assembler.toResource(service.list(filter, pageable));
    }
}
