package vzh.cms.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ActiveProfiles;
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

@ActiveProfiles("dev")
@DataJpaTest
public class UserRepositoryIT {

    @Autowired
    private TestEntityManager manager;

    @Autowired
    private UserRepository subj;

    @Test
    public void listNoTags() {

        manager.persistAndFlush(withTags("admin"));

        UserFilter filter = new UserFilter();
        filter.setTags(new String[]{"a"});

        Page<RowUser> result = subj.list(filter, PageRequest.of(0, 1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(0);
        List<RowUser> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).isEmpty();
    }

    @Test
    public void listAllTags() {

        manager.persistAndFlush(withTags("admin", tag("a"), tag("b")));
        manager.persistAndFlush(withTags("manager", tag("c"), tag("d")));

        UserFilter filter = new UserFilter();
        filter.setTags(new String[]{"a"});

        Page<RowUser> result = subj.list(filter, PageRequest.of(0, 1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(1);
        List<RowUser> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowUser::getId).contains("admin");
        assertThat(content).flatExtracting(RowTagged::getTags).extracting(RowTagged.Tag::getName).contains("a", "b");

        result = subj.list(filter, PageRequest.of(1, 1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(1);
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).isEmpty();
    }

    @Test
    public void withActiveRolesNoTags() {

        manager.persistAndFlush(withTags("admin"));

        Optional<User> result = subj.withActiveRoles("admin");

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isTrue();

        User user = result.get();

        assertThat(user).isNotNull();
        assertThat(user.getId()).isEqualTo("admin");
        assertThat(user.getTags()).isEmpty();
    }

    @Test
    public void withActiveRolesAllTags() {

        manager.persistAndFlush(withTags("admin", delayedTag("a"), tag("b"), expiredTag("c")));
        manager.persistAndFlush(withTags("manager", tag("d")));

        Optional<User> result = subj.withActiveRoles("admin");

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isTrue();

        User user = result.get();

        assertThat(user).isNotNull();
        assertThat(user.getId()).isEqualTo("admin");
        assertThat(user.getTags()).extracting(Tag::getName).contains("b");
    }
}
