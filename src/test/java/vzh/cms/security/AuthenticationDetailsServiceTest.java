package vzh.cms.security;

import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import vzh.cms.repository.UserRepository;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static vzh.cms.fixture.TagFixture.tag;
import static vzh.cms.fixture.UserFixture.withTags;

@RunWith(MockitoJUnitRunner.class)
public class AuthenticationDetailsServiceTest {

    private static final String ID = "id";
    private static final String NAME = "ROLE_A";

    @Mock
    private UserRepository repository;

    @InjectMocks
    private AuthenticationDetailsService service;

    @After
    public void after() {
        verify(repository).withActiveRoles(ID);
        verifyNoMoreInteractions(repository);
    }

    @Test
    public void noUser() {

        UsernameNotFoundException exception = assertThrows(UsernameNotFoundException.class, () -> service.loadUserByUsername(ID));

        assertThat(exception.getMessage()).isEqualTo(ID);
    }

    @Test
    public void emptyTags() {

        when(repository.withActiveRoles(any())).thenReturn(Optional.of(withTags(ID)));

        UserDetails result = service.loadUserByUsername(ID);

        assertThat(result).isNotNull();
        assertThat(result.getUsername()).isEqualTo(ID);
        assertThat(result.getPassword()).isEqualTo(ID);
        assertThat(result.getAuthorities()).isNotNull();
        assertThat(result.getAuthorities()).isEmpty();
    }

    @Test
    public void tags() {

        when(repository.withActiveRoles(any())).thenReturn(Optional.of(withTags(ID, tag(NAME))));

        UserDetails result = service.loadUserByUsername(ID);

        assertThat(result).isNotNull();
        assertThat(result.getUsername()).isEqualTo(ID);
        assertThat(result.getUsername()).isEqualTo(ID);
        assertThat(result.getAuthorities()).isNotNull();
        assertThat(result.getAuthorities()).extracting(GrantedAuthority::getAuthority).containsOnly(NAME);
    }
}
