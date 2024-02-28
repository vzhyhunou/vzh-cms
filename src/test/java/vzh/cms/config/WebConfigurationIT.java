package vzh.cms.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.core.userdetails.AuthenticationUserDetailsService;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.test.web.servlet.MockMvc;
import vzh.cms.security.SecurityConfiguration;
import vzh.cms.security.TokenService;
import vzh.cms.service.ExportService;
import vzh.cms.service.ImportService;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest
@Import(SecurityConfiguration.class)
public class WebConfigurationIT {

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
    private MockMvc mockMvc;

    @Test
    public void index() throws Exception {
        mockMvc.perform(get("/index.html"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("/assets/")));
    }
}
