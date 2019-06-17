package vzh.cms.service;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import vzh.cms.dto.PageFilter;
import vzh.cms.model.Page;
import vzh.cms.projection.RowPage;
import vzh.cms.projection.TitlePage;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static vzh.cms.fixture.PageFixture.getByLang;
import static vzh.cms.fixture.PageFixture.getByTags;

@Import(PageService.class)
public class PageServiceTest extends ItemServiceTest {

    @Autowired
    private PageService service;

    @Test
    public void listAllLanguages() {

        persist(getByLang("home", "en", "ru"));
        persist(getByLang("sample", "en", "ru"));

        PageFilter filter = new PageFilter();

        org.springframework.data.domain.Page<RowPage> result = service.list(filter, "en", page(0));

        assertThat(result).isNotNull();
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).containsOnlyOnce("home");
        assertThat(content).flatExtracting(p -> p.getProperties().keySet()).containsOnlyOnce("en");

        result = service.list(filter, "en", page(1));

        assertThat(result).isNotNull();
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).containsOnlyOnce("sample");
        assertThat(content).flatExtracting(p -> p.getProperties().keySet()).containsOnlyOnce("en");
    }

    @Test
    public void listAllNoLanguages() {

        persist(getByLang("home"));
        persist(getByLang("sample"));

        PageFilter filter = new PageFilter();

        org.springframework.data.domain.Page<RowPage> result = service.list(filter, "en", page(0));

        assertThat(result).isNotNull();
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).contains("home");
        assertThat(content).flatExtracting(p -> p.getProperties().keySet()).isEmpty();

        result = service.list(filter, "en", page(1));

        assertThat(result).isNotNull();
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).contains("sample");
        assertThat(content).flatExtracting(p -> p.getProperties().keySet()).isEmpty();
    }

    @Test
    public void listIdLanguages() {

        persist(getByLang("home", "en", "ru"));
        persist(getByLang("sample"));

        PageFilter filter = new PageFilter();
        filter.setId("oM");

        org.springframework.data.domain.Page<RowPage> result = service.list(filter, "en", page(0));

        assertThat(result).isNotNull();
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).containsOnlyOnce("home");
        assertThat(content).flatExtracting(p -> p.getProperties().keySet()).containsOnlyOnce("en");

        result = service.list(filter, "en", page(1));

        assertThat(result).isNotNull();
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).isEmpty();
    }

    @Test
    public void listIdNoLanguages() {

        persist(getByLang("home"));
        persist(getByLang("sample"));

        PageFilter filter = new PageFilter();
        filter.setId("oM");

        org.springframework.data.domain.Page<RowPage> result = service.list(filter, "en", page(0));

        assertThat(result).isNotNull();
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).containsOnlyOnce("home");
        assertThat(content).flatExtracting(p -> p.getProperties().keySet()).isEmpty();

        result = service.list(filter, "en", page(1));

        assertThat(result).isNotNull();
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).isEmpty();
    }

    @Test
    public void listTitle() {

        persist(getByLang("home", "en", "ru"));
        persist(getByLang("sample", "en", "ru"));

        PageFilter filter = new PageFilter();
        filter.setTitle("mE.E");

        org.springframework.data.domain.Page<RowPage> result = service.list(filter, "en", page(0));

        assertThat(result).isNotNull();
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).containsOnlyOnce("home");
        assertThat(content).flatExtracting(p -> p.getProperties().keySet()).containsOnlyOnce("en");

        result = service.list(filter, "en", page(1));

        assertThat(result).isNotNull();
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).isEmpty();
    }

    @Test
    public void listNoTags() {

        persist(getByTags("home"));

        PageFilter filter = new PageFilter();
        filter.setTags(new String[]{"a"});

        org.springframework.data.domain.Page<RowPage> result = service.list(filter, "en", page(0));

        assertThat(result).isNotNull();
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).isEmpty();
    }

    @Test
    public void listAllTags() {

        persist(getByTags("home", "a", "b"));
        persist(getByTags("sample", "c", "d"));

        PageFilter filter = new PageFilter();
        filter.setTags(new String[]{"a"});

        org.springframework.data.domain.Page<RowPage> result = service.list(filter, "en", page(0));

        assertThat(result).isNotNull();
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).containsOnlyOnce("home");
        assertThat(content).flatExtracting(RowPage::getTags).containsOnlyOnce("a", "b");

        result = service.list(filter, "en", page(1));

        assertThat(result).isNotNull();
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).isEmpty();
    }

    @Test
    public void oneAllLanguages() {

        persist(getByLang("home", "en", "ru"));
        persist(getByLang("sample"));

        Optional<Page> result = service.one("home", "en");

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isTrue();

        Page page = result.get();

        assertThat(page).isNotNull();
        assertThat(page.getId()).isEqualTo("home");
        assertThat(page.getProperties().keySet()).containsOnlyOnce("en");
    }

    @Test
    public void oneNone() {

        persist(getByLang("sample"));

        Optional<Page> result = service.one("home", "en");

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isFalse();
    }

    @Test
    public void oneNoLanguages() {

        persist(getByLang("home"));
        persist(getByLang("sample"));

        Optional<Page> result = service.one("home", "en");

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isFalse();
    }

    @Test
    public void oneLanguage() {

        persist(getByLang("home", "en"));
        persist(getByLang("sample"));

        Optional<Page> result = service.one("home", "en");

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isTrue();

        Page page = result.get();

        assertThat(page).isNotNull();
        assertThat(page.getId()).isEqualTo("home");
        assertThat(page.getProperties().keySet()).containsOnlyOnce("en");
    }

    @Test
    public void oneNoLanguage() {

        persist(getByLang("home", "ru"));
        persist(getByLang("sample"));

        Optional<Page> result = service.one("home", "en");

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isFalse();
    }

    @Test
    public void menu() {

        persist(getByTags("home"));
        persist(getByTags("sample", "menu"));

        List<TitlePage> results = service.menu("en");

        assertThat(results).isNotNull();
        assertThat(results).extracting(TitlePage::getId).containsOnlyOnce("sample");
        assertThat(results).flatExtracting(p -> p.getProperties().keySet()).containsOnlyOnce("en");
    }

    /*private void persistLanguages(String id, String... languages) {
        Page page = new Page();
        page.setId(id);
        Arrays.stream(languages).forEach(l -> {
            PageProperty property = new PageProperty();
            property.setTitle(String.format("%s.%s.title", id, l));
            property.setContent(String.format("%s.%s.content", id, l));
            page.getProperties().put(l, property);
        });
        manager.persistAndFlush(page);
        manager.clear();
    }

    protected void persistTags(String id, String... tags) {
        Page page = new Page();
        page.setId(id);
        page.getTags().addAll(Arrays.asList(tags));
        PageProperty property = new PageProperty();
        property.setTitle(String.format("%s.title", id));
        property.setContent(String.format("%s.content", id));
        page.getProperties().put("en", property);
        page.getProperties().put("ru", property);
        manager.persistAndFlush(page);
        manager.clear();
    }*/
}
