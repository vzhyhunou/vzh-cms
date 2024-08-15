package vzh.cms.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.core.userdetails.AuthenticationUserDetailsService;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import vzh.cms.model.User;
import vzh.cms.security.SecurityConfiguration;
import vzh.cms.security.TokenService;
import vzh.cms.service.ExportService;
import vzh.cms.service.ImportService;

import javax.persistence.EntityManager;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.util.StringUtils.trimAllWhitespace;

@WebMvcTest
@Import({SecurityConfiguration.class, CmsConfiguration.class})
public class CmsConfigurationIT {

    @MockBean
    private PasswordEncoder passwordEncoder;

    @MockBean
    private AuthenticationUserDetailsService<PreAuthenticatedAuthenticationToken> authenticationUserDetailsService;

    @MockBean
    private UserDetailsService userDetailsService;

    @MockBean
    private ImportService importService;

    @MockBean
    private EntityManager em;

    @MockBean
    private ExportService exportService;

    @MockBean
    private TokenService tokenService;

    @Autowired
    private ObjectMapper jacksonObjectMapper;

    @Autowired
    @Qualifier("resourceObjectMapper")
    ObjectMapper resourceObjectMapper;

    @Autowired
    @Qualifier("unlinkedObjectMapper")
    private ObjectMapper unlinkedObjectMapper;

    @Test
    public void jacksonRead() throws JsonProcessingException {
        User user = new User();
        when(em.find(User.class, "c")).thenReturn(user);
        User result = jacksonObjectMapper.readValue("{\"id\":\"a\",\"password\":\"b\",\"userId\":\"c\"}", User.class);
        assertThat(result.getId()).isEqualTo("a");
        assertThat(result.getPassword()).isEqualTo("b");
        assertThat(result.getUser()).isSameAs(user);
    }

    @Test
    public void jacksonWrite() throws JsonProcessingException {
        User user = new User() {
            @Override
            public Object[] getParents() {
                return new Object[]{1, 2};
            }
        };
        user.setId("a");
        user.setPassword("b");
        User u = new User();
        u.setId("c");
        user.setUser(u);
        String result = jacksonObjectMapper.writeValueAsString(user);
        assertThat(trimAllWhitespace(result)).isEqualTo("{\"id\":\"a\",\"parents\":[1,2],\"userId\":\"c\"}");
    }

    @Test
    public void resourceRead() throws JsonProcessingException {
        User user = new User();
        when(em.find(User.class, "c")).thenReturn(user);
        User result = resourceObjectMapper.readValue("{\"id\":\"a\",\"password\":\"b\",\"userId\":\"c\"}", User.class);
        assertThat(result.getId()).isEqualTo("a");
        assertThat(result.getPassword()).isEqualTo("b");
        assertThat(result.getUser()).isSameAs(user);
    }

    @Test
    public void resourceWrite() throws JsonProcessingException {
        User user = new User() {
            @Override
            public Object[] getParents() {
                return new Object[]{1, 2};
            }
        };
        user.setId("a");
        user.setPassword("b");
        User u = new User();
        u.setId("c");
        user.setUser(u);
        String result = resourceObjectMapper.writeValueAsString(user);
        assertThat(trimAllWhitespace(result)).isEqualTo("{\"id\":\"a\",\"password\":\"b\",\"userId\":\"c\"}");
    }

    @Test
    public void unlinkedRead() throws JsonProcessingException {
        User result = unlinkedObjectMapper.readValue("{\"id\":\"a\",\"password\":\"b\",\"userId\":\"c\"}", User.class);
        assertThat(result.getId()).isEqualTo("a");
        assertThat(result.getPassword()).isEqualTo("b");
        verifyNoInteractions(em);
    }
}
