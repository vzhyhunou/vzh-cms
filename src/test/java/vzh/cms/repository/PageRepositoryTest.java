package vzh.cms.repository;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import vzh.cms.dto.PageFilter;
import vzh.cms.model.PageProperty_;
import vzh.cms.projection.NameTag;
import vzh.cms.projection.PropertyPage;
import vzh.cms.projection.RowPage;
import vzh.cms.projection.TitlePage;
import vzh.cms.projection.TitlePageProperty;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static vzh.cms.fixture.PageFixture.withLang;
import static vzh.cms.fixture.PageFixture.withTags;
import static vzh.cms.fixture.TagFixture.*;

public class PageRepositoryTest extends RepositoryTest {

    @Autowired
    private PageRepository repository;

    @Test
    public void listAllLanguages() {

        persist(withLang("home", "en", "ru"));
        persist(withLang("sample", "en", "ru"));

        PageFilter filter = new PageFilter();

        org.springframework.data.domain.Page<RowPage> result = repository.list(filter, page(0));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(2);
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).containsOnly("home").containsOnlyOnce("home");
        assertThat(content).extracting(RowPage::getProperty).extracting(TitlePageProperty::getTitle).containsOnly("home.en.title");

        result = repository.list(filter, page(1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(2);
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).containsOnly("sample").containsOnlyOnce("sample");
        assertThat(content).extracting(RowPage::getProperty).extracting(TitlePageProperty::getTitle).containsOnly("sample.en.title");
    }

    @Test
    public void listAnotherLanguage() {

        persist(withLang("home", "ru"));
        persist(withLang("sample", "ru"));

        PageFilter filter = new PageFilter();

        org.springframework.data.domain.Page<RowPage> result = repository.list(filter, page(0));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(2);
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).containsOnly("home").containsOnlyOnce("home");
        assertThat(content).extracting(RowPage::getProperty).containsOnlyNulls();

        result = repository.list(filter, page(1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(2);
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).containsOnly("sample").containsOnlyOnce("sample");
        assertThat(content).extracting(RowPage::getProperty).containsOnlyNulls();
    }

    @Test
    public void listAllNoLanguages() {

        persist(withLang("home"));
        persist(withLang("sample"));

        PageFilter filter = new PageFilter();

        org.springframework.data.domain.Page<RowPage> result = repository.list(filter, page(0));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(2);
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).containsOnly("home").containsOnlyOnce("home");
        assertThat(content).extracting(RowPage::getProperty).containsOnlyNulls();

        result = repository.list(filter, page(1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(2);
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).containsOnly("sample").containsOnlyOnce("sample");
        assertThat(content).extracting(RowPage::getProperty).containsOnlyNulls();
    }

    @Test
    public void listIdLanguages() {

        persist(withLang("home", "en", "ru"));
        persist(withLang("sample"));

        PageFilter filter = new PageFilter();
        filter.setId("oM");

        org.springframework.data.domain.Page<RowPage> result = repository.list(filter, page(0));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(1);
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).containsOnly("home").containsOnlyOnce("home");
        assertThat(content).extracting(RowPage::getProperty).extracting(TitlePageProperty::getTitle).containsOnly("home.en.title");

        result = repository.list(filter, page(1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(1);
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).isEmpty();
    }

    @Test
    public void listIdNoLanguages() {

        persist(withLang("home"));
        persist(withLang("sample"));

        PageFilter filter = new PageFilter();
        filter.setId("oM");

        org.springframework.data.domain.Page<RowPage> result = repository.list(filter, page(0));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(1);
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).containsOnly("home").containsOnlyOnce("home");
        assertThat(content).extracting(RowPage::getProperty).containsOnlyNulls();

        result = repository.list(filter, page(1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(1);
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).isEmpty();
    }

    @Test
    public void listTitle() {

        persist(withLang("home", "en", "ru"));
        persist(withLang("sample", "en", "ru"));

        PageFilter filter = new PageFilter();
        filter.setTitle("mE.E");

        org.springframework.data.domain.Page<RowPage> result = repository.list(filter, page(0));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(1);
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).containsOnly("home").containsOnlyOnce("home");
        assertThat(content).extracting(RowPage::getProperty).extracting(TitlePageProperty::getTitle).containsOnly("home.en.title");

        result = repository.list(filter, page(1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(1);
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).isEmpty();
    }

    @Test
    public void listNoTags() {

        persist(withTags("home"));

        PageFilter filter = new PageFilter();
        filter.setTags(new String[]{"a"});

        org.springframework.data.domain.Page<RowPage> result = repository.list(filter, page(0));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(0);
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).isEmpty();
    }

    @Test
    public void listAllTags() {

        persist(withTags("home", tag("a"), tag("b")));
        persist(withTags("sample", tag("c"), tag("d")));

        PageFilter filter = new PageFilter();
        filter.setTags(new String[]{"a"});

        org.springframework.data.domain.Page<RowPage> result = repository.list(filter, page(0));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(1);
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).containsOnly("home").containsOnlyOnce("home");
        assertThat(content).flatExtracting(RowPage::getTags).extracting(NameTag::getName).containsOnly("a", "b");

        result = repository.list(filter, page(1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(1);
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).isEmpty();
    }

    @Test
    public void oneAllLanguages() {

        persist(withLang("home", "en", "ru"));
        persist(withLang("sample"));

        Optional<PropertyPage> result = repository.contentByActiveTags("home", PropertyPage.class);

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isTrue();

        PropertyPage page = result.get();

        assertThat(page).isNotNull();
        assertThat(page.getTitle()).isEqualTo("home.en.title");
        assertThat(page.getContent()).isEqualTo("home.en.content");
    }

    @Test
    public void oneNone() {

        persist(withLang("sample"));

        Optional<PropertyPage> result = repository.contentByActiveTags("home", PropertyPage.class);

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isFalse();
    }

    @Test
    public void oneNoLanguages() {

        persist(withLang("home"));
        persist(withLang("sample"));

        Optional<PropertyPage> result = repository.contentByActiveTags("home", PropertyPage.class);

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isFalse();
    }

    @Test
    public void oneLanguage() {

        persist(withLang("home", "en"));
        persist(withLang("sample"));

        Optional<PropertyPage> result = repository.contentByActiveTags("home", PropertyPage.class);

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isTrue();

        PropertyPage page = result.get();

        assertThat(page).isNotNull();
        assertThat(page.getTitle()).isEqualTo("home.en.title");
        assertThat(page.getContent()).isEqualTo("home.en.content");
    }

    @Test
    public void oneNoLanguage() {

        persist(withLang("home", "ru"));
        persist(withLang("sample"));

        Optional<PropertyPage> result = repository.contentByActiveTags("home", PropertyPage.class);

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isFalse();
    }

    @Test
    public void listByActiveTags() {

        persist(withTags("home"));
        persist(withTags("test", tag("tag")));
        persist(withTags("sample", tag("tag")));
        persist(withTags("sample1", delayedTag("tag")));
        persist(withTags("sample2", expiredTag("tag")));

        List<TitlePage> results = repository.contentsByActiveTags(TitlePage.class, PageProperty_.TITLE, "tag");

        assertThat(results).isNotNull();
        assertThat(results).extracting(TitlePage::getId).containsOnly("test", "sample").containsOnlyOnce("test", "sample");
        assertThat(results).extracting(TitlePage::getTitle).containsOnly("test.title", "sample.title");
        assertThat(results).extracting(TitlePage::getTitle).isSorted();
    }
}
