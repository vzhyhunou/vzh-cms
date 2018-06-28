package vzh.cms.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import vzh.cms.model.Page;
import vzh.cms.model.PageFilter;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PageServiceTest {

    @Autowired
    private PageService service;

    @Test
    public void listAll() {

        org.springframework.data.domain.Page<Page> result = service.list(new PageFilter(), "en", null);

        assertThat(result).isNotNull();
        List<Page> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content.size()).isEqualTo(31);
        assertThat(content).flatExtracting(p -> p.getProperties().keySet()).containsOnly("en");
    }

    @Test
    public void listFilter() {

        PageFilter filter = new PageFilter();
        filter.setId("ple");
        org.springframework.data.domain.Page<Page> result = service.list(filter, "en", null);

        assertThat(result).isNotNull();
        List<Page> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content.size()).isEqualTo(30);
        assertThat(content).extracting(Page::getId).doesNotContain("home");
        assertThat(content).flatExtracting(p -> p.getProperties().keySet()).containsOnly("en");
    }

    @Test
    public void one() {

        Page result = service.one("home", "en");

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo("home");
        assertThat(result.getProperties().keySet()).containsOnly("en");
    }
}
