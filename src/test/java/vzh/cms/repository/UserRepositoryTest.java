package vzh.cms.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import vzh.cms.dto.UserFilter;
import vzh.cms.model.Tag;
import vzh.cms.model.User;
import vzh.cms.projection.RowTagged;
import vzh.cms.projection.RowUser;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static vzh.cms.fixture.TagFixture.*;
import static vzh.cms.fixture.UserFixture.withTags;

public class UserRepositoryTest extends RepositoryTest {

    @Autowired
    private UserRepository repository;

    @Test
    public void listNoTags() {

        persist(withTags("admin"));

        UserFilter filter = new UserFilter();
        filter.setTags(new String[]{"a"});

        Page<RowUser> result = repository.list(filter, page(0));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(0);
        List<RowUser> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).isEmpty();
    }

    @Test
    public void listAllTags() {

        persist(withTags("admin", tag("a"), tag("b")));
        persist(withTags("manager", tag("c"), tag("d")));

        UserFilter filter = new UserFilter();
        filter.setTags(new String[]{"a"});

        Page<RowUser> result = repository.list(filter, page(0));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(1);
        List<RowUser> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowUser::getId).containsOnly("admin").containsOnlyOnce("admin");
        assertThat(content).flatExtracting(RowTagged::getTags).extracting(RowTagged.Tag::getName).containsOnly("a", "b").containsOnlyOnce("a", "b");

        result = repository.list(filter, page(1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(1);
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).isEmpty();
    }

    @Test
    public void withActiveRolesNoTags() {

        persist(withTags("admin"));

        Optional<User> result = repository.withActiveRoles("admin");

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isTrue();

        User user = result.get();

        assertThat(user).isNotNull();
        assertThat(user.getId()).isEqualTo("admin");
        assertThat(user.getTags()).isEmpty();
    }

    @Test
    public void withActiveRolesAllTags() {

        persist(withTags("admin", delayedTag("ROLE_A"), tag("ROLE_B"), tag("A"), expiredTag("ROLE_C")));
        persist(withTags("manager", tag("ROLE_D")));

        Optional<User> result = repository.withActiveRoles("admin");

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isTrue();

        User user = result.get();

        assertThat(user).isNotNull();
        assertThat(user.getId()).isEqualTo("admin");
        assertThat(user.getTags()).extracting(Tag::getName).containsOnly("ROLE_B").containsOnlyOnce("ROLE_B");
    }
}
