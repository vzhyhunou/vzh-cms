package vzh.cms.controller;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import vzh.cms.config.property.ApplicationProperties;

import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * @author Viktar Zhyhunou
 */
@RunWith(SpringRunner.class)
@WebMvcTest(ApplicationController.class)
@EnableConfigurationProperties(ApplicationProperties.class)
public class PageControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void index() throws Exception {

        mockMvc.perform(get("/"))
                .andDo(print())
                .andExpect(status().is3xxRedirection())
                .andExpect(header().string("Location", equalTo("pages/home")));
    }

    @Test
    public void pages() throws Exception {

        mockMvc.perform(get("/pages"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(xpath("//body/script[1]/@src").string(equalTo("/static/built/commons.js")))
                .andExpect(xpath("//body/script[2]/@src").string(equalTo("/static/built/pages.js")));
    }
}
