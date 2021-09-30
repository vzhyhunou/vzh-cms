package vzh.cms.controller;

import lombok.RequiredArgsConstructor;
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
import vzh.cms.service.UserService;

/**
 * @author Viktar Zhyhunou
 */
@RepositoryRestController
@RequestMapping("users")
@RequiredArgsConstructor
public class UserController {

    private final UserService service;

    private final PagedResourcesAssembler<RowUser> assembler;

    @ResponseBody
    @GetMapping("search/list")
    public PagedModel<EntityModel<RowUser>> list(UserFilter filter, Pageable pageable) {
        return assembler.toModel(service.list(filter, pageable));
    }
}
