package vzh.cms.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import vzh.cms.dto.PageFilter;
import vzh.cms.projection.PropertyPage;
import vzh.cms.projection.RowPage;
import vzh.cms.projection.RowTagged;
import vzh.cms.projection.TitlePage;

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
        assertThat(content).flatExtracting(p -> p.getProperties().keySet()).containsOnly("en");
        assertThat(content).flatExtracting(p -> p.getProperties().values()).extracting(RowPage.Property::getTitle).containsOnly("home.en.title");

        result = repository.list(filter, page(1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(2);
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).containsOnly("sample").containsOnlyOnce("sample");
        assertThat(content).flatExtracting(p -> p.getProperties().keySet()).containsOnly("en");
        assertThat(content).flatExtracting(p -> p.getProperties().values()).extracting(RowPage.Property::getTitle).containsOnly("sample.en.title");
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
        assertThat(content).flatExtracting(p -> p.getProperties().keySet()).isEmpty();

        result = repository.list(filter, page(1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(2);
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).containsOnly("sample").containsOnlyOnce("sample");
        assertThat(content).flatExtracting(p -> p.getProperties().keySet()).isEmpty();
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
        assertThat(content).flatExtracting(p -> p.getProperties().keySet()).isEmpty();

        result = repository.list(filter, page(1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(2);
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).containsOnly("sample").containsOnlyOnce("sample");
        assertThat(content).flatExtracting(p -> p.getProperties().keySet()).isEmpty();
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
        assertThat(content).flatExtracting(p -> p.getProperties().keySet()).containsOnly("en");
        assertThat(content).flatExtracting(p -> p.getProperties().values()).extracting(RowPage.Property::getTitle).containsOnly("home.en.title");

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
        assertThat(content).flatExtracting(p -> p.getProperties().keySet()).isEmpty();

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
        assertThat(content).flatExtracting(p -> p.getProperties().keySet()).containsOnly("en");
        assertThat(content).flatExtracting(p -> p.getProperties().values()).extracting(RowPage.Property::getTitle).containsOnly("home.en.title");

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
        assertThat(content).flatExtracting(RowTagged::getTags).extracting(RowTagged.Tag::getName).containsOnly("a", "b").containsOnlyOnce("a", "b");

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

        Optional<PropertyPage> result = repository.one("home");

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

        Optional<PropertyPage> result = repository.one("home");

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isFalse();
    }

    @Test
    public void oneNoLanguages() {

        persist(withLang("home"));
        persist(withLang("sample"));

        Optional<PropertyPage> result = repository.one("home");

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isFalse();
    }

    @Test
    public void oneLanguage() {

        persist(withLang("home", "en"));
        persist(withLang("sample"));

        Optional<PropertyPage> result = repository.one("home");

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isTrue();

        PropertyPage page = result.get();

        assertThat(page).isNotNull();
        assertThat(page.getTitle()).isEqualTo("home.en.title");
        assertThat(page.getContent()).isEqualTo("home.en.content");
    }

    @Test
    public void oneAnotherLanguage() {

        persist(withLang("home", "ru"));
        persist(withLang("sample"));

        Optional<PropertyPage> result = repository.one("home");

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isFalse();
    }

    @Test
    public void oneByTag() {

        persist(withTags("home", tag("a"), tag("b")));

        Optional<PropertyPage> result = repository.one("home", "a");

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isTrue();

        PropertyPage page = result.get();

        assertThat(page).isNotNull();
        assertThat(page.getTitle()).isEqualTo("home.en.title");
        assertThat(page.getContent()).isEqualTo("home.en.content");
    }

    @Test
    public void oneByAnotherTag() {

        persist(withTags("home", tag("a"), tag("b")));

        Optional<PropertyPage> result = repository.one("home", "c");

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isFalse();
    }

    @Test
    public void oneByNoTag() {

        persist(withTags("home", tag("a"), tag("b")));

        Optional<PropertyPage> result = repository.one("home");

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isTrue();

        PropertyPage page = result.get();

        assertThat(page).isNotNull();
        assertThat(page.getTitle()).isEqualTo("home.en.title");
        assertThat(page.getContent()).isEqualTo("home.en.content");
    }

    @Test
    public void menuByAllTagsEmpty() {

        persist(withTags("home", tag("a")));

        List<TitlePage> result = repository.menu("a", "b");

        assertThat(result).isNotNull();
        assertThat(result).isEmpty();
    }

    @Test
    public void menuByAllTags() {

        persist(withTags("home", tag("a"), tag("b")));

        List<TitlePage> result = repository.menu("a", "b");

        assertThat(result).isNotNull();
        assertThat(result).extracting(TitlePage::getId).containsOnly("home").containsOnlyOnce("home");
        assertThat(result).extracting(TitlePage::getTitle).containsOnly("home.en.title").containsOnlyOnce("home.en.title");
    }

    @Test
    public void menuActiveTags() {

        persist(withTags("home"));
        persist(withTags("test", tag("tag")));
        persist(withTags("sample", tag("tag")));
        persist(withTags("sample1", delayedTag("tag")));
        persist(withTags("sample2", expiredTag("tag")));

        List<TitlePage> result = repository.menu("tag");

        assertThat(result).isNotNull();
        assertThat(result).extracting(TitlePage::getId).containsOnly("test", "sample").containsOnlyOnce("test", "sample");
        assertThat(result).extracting(TitlePage::getTitle).containsOnly("test.en.title", "sample.en.title").containsOnlyOnce("test.en.title", "sample.en.title");
        assertThat(result).extracting(TitlePage::getTitle).isSorted();
    }
}
