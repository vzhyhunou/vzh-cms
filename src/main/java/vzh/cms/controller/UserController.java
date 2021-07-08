package vzh.cms.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.rest.webmvc.RepositoryRestController;
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
@RequiredArgsConstructor
public class UserController {

    private final UserRepository repository;

    @ResponseBody
    @GetMapping("search/list")
    public Page<RowUser> list(UserFilter filter, Pageable pageable) {
        return repository.list(filter, pageable);
    }
}
