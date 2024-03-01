package vzh.cms.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
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

import static org.assertj.core.api.Assertions.assertThat;
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
    private ExportService exportService;

    @MockBean
    private TokenService tokenService;

    @Autowired
    private ObjectMapper jacksonObjectMapper;

    @Test
    public void read() throws JsonProcessingException {
        User user = jacksonObjectMapper.readValue("{\"id\":\"a\",\"password\":\"b\"}", User.class);
        assertThat(user.getId()).isEqualTo("a");
        assertThat(user.getPassword()).isEqualTo("b");
    }

    @Test
    public void write() throws JsonProcessingException {
        User user = new User();
        user.setId("a");
        user.setPassword("b");
        String result = jacksonObjectMapper.writeValueAsString(user);
        assertThat(trimAllWhitespace(result)).isEqualTo("{\"id\":\"a\"}");
    }
}
