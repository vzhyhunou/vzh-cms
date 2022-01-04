package vzh.cms.security;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import vzh.cms.service.UserService;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;
import static vzh.cms.fixture.TagFixture.tag;
import static vzh.cms.fixture.UserFixture.withTags;

@ExtendWith(MockitoExtension.class)
public class AuthenticationServiceTest {

    private static final String ID = "id";

    @Mock
    private UserService userService;

    @InjectMocks
    private AuthenticationService subj;

    @AfterEach
    public void after() {
        verify(userService).withActiveRoles(ID);
        verifyNoMoreInteractions(userService);
    }

    @Test
    public void noUser() {

        UsernameNotFoundException exception = assertThrows(
                UsernameNotFoundException.class,
                () -> subj.loadUserByUsername(ID)
        );

        assertThat(exception.getMessage()).isEqualTo(ID);
    }

    @Test
    public void emptyTags() {

        when(userService.withActiveRoles(any())).thenReturn(Optional.of(withTags(ID)));

        UserDetails result = subj.loadUserByUsername(ID);

        assertThat(result.getUsername()).isEqualTo(ID);
        assertThat(result.getPassword()).isEqualTo(ID);
        assertThat(result.getAuthorities()).isEmpty();
    }

    @Test
    public void tags() {

        when(userService.withActiveRoles(any())).thenReturn(Optional.of(withTags(ID, tag("a"))));

        UserDetails result = subj.loadUserByUsername(ID);

        assertThat(result.getUsername()).isEqualTo(ID);
        assertThat(result.getPassword()).isEqualTo(ID);
        assertThat(result.getAuthorities()).extracting(GrantedAuthority::getAuthority).contains("a");
    }
}
