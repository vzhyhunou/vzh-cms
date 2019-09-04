package vzh.cms.service;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
import vzh.cms.component.LangPropertiesFunction;
import vzh.cms.dto.PageFilter;
import vzh.cms.projection.NameTag;
import vzh.cms.projection.PropertyPage;
import vzh.cms.projection.RowPage;
import vzh.cms.projection.TitlePage;
import vzh.cms.projection.TitlePageProperty;
import vzh.cms.repository.PageRepository;
import vzh.cms.repository.RepositoryTest;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static vzh.cms.fixture.PageFixture.pageByLang;
import static vzh.cms.fixture.PageFixture.pageByTags;
import static vzh.cms.fixture.TagFixture.*;

@Import(LangPropertiesFunction.class)
public class PageServiceTest extends RepositoryTest {

    @Autowired
    private PageRepository repository;

    @Test
    public void listAllLanguages() {

        persist(pageByLang("home", "en", "ru"));
        persist(pageByLang("sample", "en", "ru"));

        PageFilter filter = new PageFilter();

        org.springframework.data.domain.Page<RowPage> result = repository.list(filter, page(0));

        assertThat(result).isNotNull();
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).containsOnly("home").containsOnlyOnce("home");
        assertThat(content).extracting(RowPage::getProperty).extracting(TitlePageProperty::getTitle).containsOnly("home.en.title");

        result = repository.list(filter, page(1));

        assertThat(result).isNotNull();
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).containsOnly("sample").containsOnlyOnce("sample");
        assertThat(content).extracting(RowPage::getProperty).extracting(TitlePageProperty::getTitle).containsOnly("sample.en.title");
    }

    @Test
    public void listAllNoLanguages() {

        persist(pageByLang("home"));
        persist(pageByLang("sample"));

        PageFilter filter = new PageFilter();

        org.springframework.data.domain.Page<RowPage> result = repository.list(filter, page(0));

        assertThat(result).isNotNull();
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).containsOnly("home").containsOnlyOnce("home");
        assertThat(content).extracting(RowPage::getProperty).containsOnlyNulls();

        result = repository.list(filter, page(1));

        assertThat(result).isNotNull();
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).containsOnly("sample").containsOnlyOnce("sample");
        assertThat(content).extracting(RowPage::getProperty).containsOnlyNulls();
    }

    @Test
    public void listIdLanguages() {

        persist(pageByLang("home", "en", "ru"));
        persist(pageByLang("sample"));

        PageFilter filter = new PageFilter();
        filter.setId("oM");

        org.springframework.data.domain.Page<RowPage> result = repository.list(filter, page(0));

        assertThat(result).isNotNull();
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).containsOnly("home").containsOnlyOnce("home");
        assertThat(content).extracting(RowPage::getProperty).extracting(TitlePageProperty::getTitle).containsOnly("home.en.title");

        result = repository.list(filter, page(1));

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

        org.springframework.data.domain.Page<RowPage> result = repository.list(filter, page(0));

        assertThat(result).isNotNull();
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).containsOnly("home").containsOnlyOnce("home");
        assertThat(content).extracting(RowPage::getProperty).containsOnlyNulls();

        result = repository.list(filter, page(1));

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

        org.springframework.data.domain.Page<RowPage> result = repository.list(filter, page(0));

        assertThat(result).isNotNull();
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).containsOnly("home").containsOnlyOnce("home");
        assertThat(content).extracting(RowPage::getProperty).extracting(TitlePageProperty::getTitle).containsOnly("home.en.title");

        result = repository.list(filter, page(1));

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

        org.springframework.data.domain.Page<RowPage> result = repository.list(filter, page(0));

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

        org.springframework.data.domain.Page<RowPage> result = repository.list(filter, page(0));

        assertThat(result).isNotNull();
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).containsOnly("home").containsOnlyOnce("home");
        assertThat(content).flatExtracting(RowPage::getTags).extracting(NameTag::getName).containsOnly("a", "b");

        result = repository.list(filter, page(1));

        assertThat(result).isNotNull();
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).isEmpty();
    }

    @Test
    public void oneAllLanguages() {

        persist(pageByLang("home", "en", "ru"));
        persist(pageByLang("sample"));

        Optional<PropertyPage> result = repository.one("home", PropertyPage.class);

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isTrue();

        PropertyPage page = result.get();

        assertThat(page).isNotNull();
        assertThat(page.getTitle()).isEqualTo("home.en.title");
        assertThat(page.getContent()).isEqualTo("home.en.content");
    }

    @Test
    public void oneNone() {

        persist(pageByLang("sample"));

        Optional<PropertyPage> result = repository.one("home", PropertyPage.class);

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isFalse();
    }

    @Test
    public void oneNoLanguages() {

        persist(pageByLang("home"));
        persist(pageByLang("sample"));

        Optional<PropertyPage> result = repository.one("home", PropertyPage.class);

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isFalse();
    }

    @Test
    public void oneLanguage() {

        persist(pageByLang("home", "en"));
        persist(pageByLang("sample"));

        Optional<PropertyPage> result = repository.one("home", PropertyPage.class);

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isTrue();

        PropertyPage page = result.get();

        assertThat(page).isNotNull();
        assertThat(page.getTitle()).isEqualTo("home.en.title");
        assertThat(page.getContent()).isEqualTo("home.en.content");
    }

    @Test
    public void oneNoLanguage() {

        persist(pageByLang("home", "ru"));
        persist(pageByLang("sample"));

        Optional<PropertyPage> result = repository.one("home", PropertyPage.class);

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isFalse();
    }

    @Test
    public void listByActiveTags() {

        persist(pageByTags("home"));
        persist(pageByTags("sample", tag("MENU")));
        persist(pageByTags("sample1", delayedTag("MENU")));
        persist(pageByTags("sample2", expiredTag("MENU")));

        List<TitlePage> results = repository.listByActiveTags(TitlePage.class, "MENU");

        assertThat(results).isNotNull();
        assertThat(results).extracting(TitlePage::getId).containsOnly("sample").containsOnlyOnce("sample");
        assertThat(results).extracting(TitlePage::getTitle).containsOnly("sample.title");
    }
}
