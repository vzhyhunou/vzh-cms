package vzh.cms.controller;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameter;
import org.junit.runners.Parameterized.Parameters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.TestContextManager;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.Collection;

import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.xpath;

/**
 * @author Viktar Zhyhunou
 */
@RunWith(Parameterized.class)
@WebMvcTest(PageController.class)
public class PageControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Parameter
    public String page;

    @Parameter(value = 1)
    public String expected;

    @Parameters
    public static Collection<Object[]> data() {
        Collection<Object[]> params = new ArrayList<>();
        params.add(new Object[]{"/", "built/index.js"});
        params.add(new Object[]{"/pages", "built/pages.js"});
        return params;
    }

    @Before
    public void setUp() throws Exception {
        TestContextManager testContextManager = new TestContextManager(getClass());
        testContextManager.prepareTestInstance(this);
    }

    @Test
    public void test() throws Exception {

        this.mockMvc.perform(get(page))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(xpath("//body/script[1]/@src").string(equalTo("built/commons.js")))
                .andExpect(xpath("//body/script[2]/@src").string(equalTo(expected)));
    }
}
