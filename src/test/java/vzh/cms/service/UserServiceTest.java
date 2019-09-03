package vzh.cms.service;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import vzh.cms.dto.UserFilter;
import vzh.cms.projection.NameTag;
import vzh.cms.projection.RowUser;
import vzh.cms.repository.RepositoryTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static vzh.cms.fixture.TagFixture.tag;
import static vzh.cms.fixture.UserFixture.user;

@Import(UserService.class)
public class UserServiceTest extends RepositoryTest {

    @Autowired
    private UserService service;

    @Test
    public void listNoTags() {

        persist(user("admin"));

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

        persist(user("admin", tag("a"), tag("b")));
        persist(user("manager", tag("c"), tag("d")));

        UserFilter filter = new UserFilter();
        filter.setTags(new String[]{"a"});

        Page<RowUser> result = service.list(filter, page(0));

        assertThat(result).isNotNull();
        List<RowUser> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowUser::getId).containsOnly("admin").containsOnlyOnce("admin");
        assertThat(content).flatExtracting(RowUser::getTags).extracting(NameTag::getName).containsOnly("a", "b");

        result = service.list(filter, page(1));

        assertThat(result).isNotNull();
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).isEmpty();
    }
}
