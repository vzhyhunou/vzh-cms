package vzh.cms.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import vzh.cms.dto.UserFilter;
import vzh.cms.projection.RowUser;
import vzh.cms.repository.UserRepository;

/**
 * @author Viktar Zhyhunou
 */
@RepositoryRestController
@RequiredArgsConstructor
public class UserController {

    private final UserRepository repository;

    private final PagedResourcesAssembler<RowUser> assembler;

    @ResponseBody
    @GetMapping("users/search/list")
    public PagedModel<EntityModel<RowUser>> list(UserFilter filter, Pageable pageable) {
        return assembler.toModel(repository.list(filter, pageable));
    }
}
