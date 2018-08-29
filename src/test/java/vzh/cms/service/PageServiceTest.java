package vzh.cms.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.junit4.SpringRunner;
import vzh.cms.model.NoContentPage;
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

        org.springframework.data.domain.Page<NoContentPage> result = service.list(filter, "en", page(0));

        assertThat(result).isNotNull();
        List<NoContentPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(NoContentPage::getId).containsOnly("home");
        assertThat(content).flatExtracting(p -> p.getProperties().keySet()).containsOnly("en");

        result = service.list(filter, "en", page(1));

        assertThat(result).isNotNull();
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(NoContentPage::getId).containsOnly("sample");
        assertThat(content).flatExtracting(p -> p.getProperties().keySet()).containsOnly("en");
    }

    @Test
    public void listAllNoLocales() {

        persist("home");
        persist("sample");

        PageFilter filter = new PageFilter();

        org.springframework.data.domain.Page<NoContentPage> result = service.list(filter, "en", page(0));

        assertThat(result).isNotNull();
        List<NoContentPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(NoContentPage::getId).contains("home");
        assertThat(content).flatExtracting(p -> p.getProperties().keySet()).isEmpty();

        result = service.list(filter, "en", page(1));

        assertThat(result).isNotNull();
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(NoContentPage::getId).contains("sample");
        assertThat(content).flatExtracting(p -> p.getProperties().keySet()).isEmpty();
    }

    @Test
    public void listIdLocales() {

        persist("home", "en", "ru");
        persist("sample");

        PageFilter filter = new PageFilter();
        filter.setId("oM");

        org.springframework.data.domain.Page<NoContentPage> result = service.list(filter, "en", page(0));

        assertThat(result).isNotNull();
        List<NoContentPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(NoContentPage::getId).containsOnly("home");
        assertThat(content).flatExtracting(p -> p.getProperties().keySet()).containsOnly("en");

        result = service.list(filter, "en", page(1));

        assertThat(result).isNotNull();
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).isEmpty();
    }

    @Test
    public void listIdNoLocales() {

        persist("home");
        persist("sample");

        PageFilter filter = new PageFilter();
        filter.setId("oM");

        org.springframework.data.domain.Page<NoContentPage> result = service.list(filter, "en", page(0));

        assertThat(result).isNotNull();
        List<NoContentPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(NoContentPage::getId).containsOnly("home");
        assertThat(content).flatExtracting(p -> p.getProperties().keySet()).isEmpty();

        result = service.list(filter, "en", page(1));

        assertThat(result).isNotNull();
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).isEmpty();
    }

    @Test
    public void listTitle() {

        persist("home", "en", "ru");
        persist("sample", "en", "ru");

        PageFilter filter = new PageFilter();
        filter.setTitle("mE.E");

        org.springframework.data.domain.Page<NoContentPage> result = service.list(filter, "en", page(0));

        assertThat(result).isNotNull();
        List<NoContentPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(NoContentPage::getId).containsOnly("home");
        assertThat(content).flatExtracting(p -> p.getProperties().keySet()).containsOnly("en");

        result = service.list(filter, "en", page(1));

        assertThat(result).isNotNull();
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).isEmpty();
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
    public void oneNone() {

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
        Arrays.stream(locales).forEach(l -> {
            PageProperty property = new PageProperty();
            property.setTitle(String.format("%s.%s.title", id, l));
            property.setTitle(String.format("%s.%s.content", id, l));
            page.getProperties().put(l, property);
        });
        manager.persistAndFlush(page);
        manager.clear();
    }

    private static Pageable page(int i) {
        return new PageRequest(i, 1, Sort.Direction.ASC, "id");
    }
}
