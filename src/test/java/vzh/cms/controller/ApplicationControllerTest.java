package vzh.cms.controller;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import vzh.cms.config.SecurityConfiguration;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/**
 * @author Viktar Zhyhunou
 */
@RunWith(SpringRunner.class)
@WebMvcTest
@Import(SecurityConfiguration.class)
public class ApplicationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void page() throws Exception {

        mockMvc.perform(get("/index.html"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("/static/css/")))
                .andExpect(content().string(containsString(".chunk.css")))
                .andExpect(content().string(containsString("/static/js/")))
                .andExpect(content().string(containsString(".chunk.js")))
        ;
    }
}
