package vzh.cms.controller;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import vzh.cms.config.property.CmsProperties;

import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.xpath;

/**
 * @author Viktar Zhyhunou
 */
@RunWith(SpringRunner.class)
@WebMvcTest(ApplicationController.class)
@EnableConfigurationProperties(CmsProperties.class)
public class PageControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void page() throws Exception {

        mockMvc.perform(get("/abc"))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(xpath("//body/script[1]/@src").string(equalTo("/static/built/commons.js")))
                .andExpect(xpath("//body/script[2]/@src").string(equalTo("/static/built/abc.js")));
    }
}
