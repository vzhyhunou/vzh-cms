package vzh.cms.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit4.SpringRunner;
import vzh.cms.model.Page;
import vzh.cms.model.PageFilter;
import vzh.cms.model.PageProperty;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
@Import(PageService.class)
public class PageServiceTest {

    @Autowired
    private TestEntityManager manager;

    @Autowired
    private PageService service;

    @Test
    public void listAllLocales() {

        persist("home", "en", "ru");
        persist("sample", "en", "ru");

        PageFilter filter = new PageFilter();
        org.springframework.data.domain.Page<Page> result = service.list(filter, null);

        assertThat(result).isNotNull();
        List<Page> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(Page::getId).contains("home").contains("sample");
        assertThat(content).flatExtracting(p -> p.getProperties().keySet()).contains("en").contains("ru");
    }

    @Test
    public void listAllNoLocales() {

        persist("home");
        persist("sample");

        PageFilter filter = new PageFilter();
        org.springframework.data.domain.Page<Page> result = service.list(filter, null);

        assertThat(result).isNotNull();
        List<Page> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(Page::getId).contains("home").contains("sample");
        assertThat(content).flatExtracting(p -> p.getProperties().keySet()).isEmpty();
    }

    @Test
    public void listIdLocale() {

        persist("home");
        persist("sample", "en", "ru");

        PageFilter filter = new PageFilter();
        filter.setId("ple");
        org.springframework.data.domain.Page<Page> result = service.list(filter, null);

        assertThat(result).isNotNull();
        List<Page> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(Page::getId).containsOnly("sample");
        assertThat(content).flatExtracting(p -> p.getProperties().keySet()).contains("en").contains("ru");
    }

    @Test
    public void listIdNoLocales() {

        persist("home");
        persist("sample");

        PageFilter filter = new PageFilter();
        filter.setId("ple");
        org.springframework.data.domain.Page<Page> result = service.list(filter, null);

        assertThat(result).isNotNull();
        List<Page> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(Page::getId).containsOnly("sample");
        assertThat(content).flatExtracting(p -> p.getProperties().keySet()).isEmpty();
    }

    @Test
    public void oneAllLocales() {

        persist("home", "en", "ru");
        persist("sample");

        Page result = service.one("home", "en");

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo("home");
        assertThat(result.getProperties().keySet()).containsOnly("en");
    }

    @Test
    public void oneNoEntity() {

        persist("sample");

        Page result = service.one("home", "en");

        assertThat(result).isNull();
    }

    @Test
    public void oneNoLocales() {

        persist("home");
        persist("sample");

        Page result = service.one("home", "en");

        assertThat(result).isNull();
    }

    @Test
    public void oneLocale() {

        persist("home", "en");
        persist("sample");

        Page result = service.one("home", "en");

        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo("home");
        assertThat(result.getProperties().keySet()).containsOnly("en");
    }

    @Test
    public void oneNoLocale() {

        persist("home", "ru");
        persist("sample");

        Page result = service.one("home", "en");

        assertThat(result).isNull();
    }

    private void persist(String id, String... locales) {
        Page page = new Page();
        page.setId(id);
        Arrays.stream(locales).forEach(locale -> {
            PageProperty property = new PageProperty();
            property.setTitle("title");
            page.getProperties().put(locale, property);
        });
        manager.persistAndFlush(page);
        manager.clear();
    }
}
