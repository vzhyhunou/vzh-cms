package vzh.cms.service;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import vzh.cms.dto.UserFilter;
import vzh.cms.model.User;
import vzh.cms.projection.RowUser;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@Import(UserService.class)
public class UserServiceTest extends ItemServiceTest {

    @Autowired
    private UserService service;

    @Test
    public void listNoTags() {

        persistTags("admin");

        UserFilter filter = new UserFilter();
        filter.setTags(new String[]{"a"});

        Page<RowUser> result = service.list(filter, page(0));

        assertThat(result).isNotNull();
        List<RowUser> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).isEmpty();
    }

    @Test
    public void listAllTags() {

        persistTags("admin", "a", "b");
        persistTags("manager", "c", "d");

        UserFilter filter = new UserFilter();
        filter.setTags(new String[]{"a"});

        Page<RowUser> result = service.list(filter, page(0));

        assertThat(result).isNotNull();
        List<RowUser> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowUser::getId).containsOnlyOnce("admin");
        assertThat(content).flatExtracting(RowUser::getTags).containsOnlyOnce("a", "b");

        result = service.list(filter, page(1));

        assertThat(result).isNotNull();
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).isEmpty();
    }

    protected void persistTags(String id, String... tags) {
        User user = new User();
        user.setId(id);
        user.setPassword(id);
        user.getTags().addAll(Arrays.asList(tags));
        manager.persistAndFlush(user);
        manager.clear();
    }
}
