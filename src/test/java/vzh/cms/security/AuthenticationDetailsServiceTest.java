package vzh.cms.security;

import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import vzh.cms.repository.BaseTest;

import static org.assertj.core.api.Assertions.assertThat;
import static vzh.cms.fixture.TagFixture.*;
import static vzh.cms.fixture.UserFixture.user;
import static vzh.cms.model.User.BCRYPT_PATTERN;

@Import({TestConfiguration.class, AuthenticationDetailsService.class})
public class AuthenticationDetailsServiceTest extends BaseTest {

    private static final String ID = "id";
    private static final String NAME = "name";

    @Autowired
    private AuthenticationDetailsService service;

    @Rule
    public ExpectedException exceptionRule = ExpectedException.none();

    @Test
    public void noUser() {

        exceptionRule.expect(UsernameNotFoundException.class);
        exceptionRule.expectMessage(ID);

        service.loadUserByUsername(ID);
    }

    @Test
    public void emptyTags() {

        persist(user(ID));

        UserDetails result = service.loadUserByUsername(ID);

        assertThat(result).isNotNull();
        assertThat(result.getUsername()).isEqualTo(ID);
        assertThat(BCRYPT_PATTERN.matcher(result.getPassword()).matches()).isTrue();
        assertThat(result.getAuthorities()).isNotNull();
        assertThat(result.getAuthorities()).isEmpty();
    }

    @Test
    public void tags() {

        persist(user(ID, tag(NAME), delayedTag("name2"), expiredTag("name3")));

        UserDetails result = service.loadUserByUsername(ID);

        assertThat(result).isNotNull();
        assertThat(result.getUsername()).isEqualTo(ID);
        assertThat(BCRYPT_PATTERN.matcher(result.getPassword()).matches()).isTrue();
        assertThat(result.getAuthorities()).isNotNull();
        assertThat(result.getAuthorities()).extracting(GrantedAuthority::getAuthority).containsOnlyOnce(NAME);
    }
}
