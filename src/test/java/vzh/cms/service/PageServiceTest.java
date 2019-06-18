package vzh.cms.service;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import vzh.cms.dto.PageFilter;
import vzh.cms.model.Page;
import vzh.cms.projection.NameTag;
import vzh.cms.projection.RowPage;
import vzh.cms.projection.TitlePage;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static vzh.cms.fixture.PageFixture.pageByLang;
import static vzh.cms.fixture.PageFixture.pageByTags;
import static vzh.cms.fixture.TagFixture.*;

@Import(PageService.class)
public class PageServiceTest extends ItemServiceTest {

    @Autowired
    private PageService service;

    @Test
    public void listAllLanguages() {

        persist(pageByLang("home", "en", "ru"));
        persist(pageByLang("sample", "en", "ru"));

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

        persist(pageByLang("home"));
        persist(pageByLang("sample"));

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

        persist(pageByLang("home", "en", "ru"));
        persist(pageByLang("sample"));

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

        persist(pageByLang("home"));
        persist(pageByLang("sample"));

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

        persist(pageByLang("home", "en", "ru"));
        persist(pageByLang("sample", "en", "ru"));

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

        persist(pageByTags("home"));

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

        persist(pageByTags("home", tag("a"), tag("b")));
        persist(pageByTags("sample", tag("c"), tag("d")));

        PageFilter filter = new PageFilter();
        filter.setTags(new String[]{"a"});

        org.springframework.data.domain.Page<RowPage> result = service.list(filter, "en", page(0));

        assertThat(result).isNotNull();
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).containsOnlyOnce("home");
        assertThat(content).flatExtracting(RowPage::getTags).extracting(NameTag::getName).containsOnlyOnce("a", "b");

        result = service.list(filter, "en", page(1));

        assertThat(result).isNotNull();
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).isEmpty();
    }

    @Test
    public void oneAllLanguages() {

        persist(pageByLang("home", "en", "ru"));
        persist(pageByLang("sample"));

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

        persist(pageByLang("sample"));

        Optional<Page> result = service.one("home", "en");

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isFalse();
    }

    @Test
    public void oneNoLanguages() {

        persist(pageByLang("home"));
        persist(pageByLang("sample"));

        Optional<Page> result = service.one("home", "en");

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isFalse();
    }

    @Test
    public void oneLanguage() {

        persist(pageByLang("home", "en"));
        persist(pageByLang("sample"));

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

        persist(pageByLang("home", "ru"));
        persist(pageByLang("sample"));

        Optional<Page> result = service.one("home", "en");

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isFalse();
    }

    @Test
    public void menu() {

        persist(pageByTags("home"));
        persist(pageByTags("sample", tag("menu")));
        persist(pageByTags("sample1", delayedTag("menu")));
        persist(pageByTags("sample2", expiredTag("menu")));

        List<TitlePage> results = service.menu("en");

        assertThat(results).isNotNull();
        assertThat(results).extracting(TitlePage::getId).containsOnlyOnce("sample");
        assertThat(results).flatExtracting(p -> p.getProperties().keySet()).containsOnlyOnce("en");
    }
}
