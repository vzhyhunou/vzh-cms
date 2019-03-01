package vzh.cms.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.junit4.SpringRunner;
import vzh.cms.model.User;
import vzh.cms.model.UserFilter;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
@Import(UserService.class)
public class UserServiceTest {

    @Autowired
    private TestEntityManager manager;

    @Autowired
    private UserService service;

    @Test
    public void listNoTags() {

        persistTags("admin");

        UserFilter filter = new UserFilter();
        filter.setTags(new String[]{"a"});

        Page<User> result = service.list(filter, page(0));

        assertThat(result).isNotNull();
        List<User> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).isEmpty();
    }

    @Test
    public void listAllTags() {

        persistTags("admin", "a", "b");
        persistTags("manager", "c", "d");

        UserFilter filter = new UserFilter();
        filter.setTags(new String[]{"a"});

        Page<User> result = service.list(filter, page(0));

        assertThat(result).isNotNull();
        List<User> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(User::getId).containsOnly("admin");
        assertThat(content).extracting(User::getPassword).isNotNull();

        result = service.list(filter, page(1));

        assertThat(result).isNotNull();
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).isEmpty();
    }

    private void persistTags(String id, String... tags) {
        User user = new User();
        user.setId(id);
        user.setPassword(id);
        user.getTags().addAll(Arrays.asList(tags));
        manager.persistAndFlush(user);
        manager.clear();
    }

    private static Pageable page(int i) {
        return PageRequest.of(i, 1, Sort.Direction.ASC, "id");
    }
}
