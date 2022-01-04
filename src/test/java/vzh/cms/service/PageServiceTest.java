package vzh.cms.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import vzh.cms.dto.PageFilter;
import vzh.cms.projection.PropertyPage;
import vzh.cms.projection.RowPage;
import vzh.cms.projection.RowTagged;
import vzh.cms.projection.TitlePage;
import vzh.cms.repository.PageRepository;
import vzh.cms.repository.RepositoryTest;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static vzh.cms.fixture.PageFixture.withLang;
import static vzh.cms.fixture.PageFixture.withTags;
import static vzh.cms.fixture.TagFixture.*;

public class PageServiceTest extends RepositoryTest {

    @TestConfiguration
    static class ContextConfiguration {

        @Bean
        PageService service(PageRepository repository) {
            return new PageService(repository);
        }
    }

    @Autowired
    private PageService subj;

    @Test
    public void listAllLanguages() {

        persist(withLang("home", "en", "ru"));
        persist(withLang("sample", "en", "ru"));

        PageFilter filter = new PageFilter();

        org.springframework.data.domain.Page<RowPage> result = subj.list(filter, page(0));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(2);
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).contains("home");
        assertThat(content).extracting(RowPage::getTitle).flatExtracting(Map::keySet).contains("en");
        assertThat(content).extracting(RowPage::getTitle).flatExtracting(Map::values).contains("home.en.title");

        result = subj.list(filter, page(1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(2);
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).contains("sample");
        assertThat(content).extracting(RowPage::getTitle).flatExtracting(Map::keySet).contains("en");
        assertThat(content).extracting(RowPage::getTitle).flatExtracting(Map::values).contains("sample.en.title");
    }

    @Test
    public void listAnotherLanguage() {

        persist(withLang("home", "ru"));
        persist(withLang("sample", "ru"));

        PageFilter filter = new PageFilter();

        org.springframework.data.domain.Page<RowPage> result = subj.list(filter, page(0));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(2);
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).contains("home");
        assertThat(content).extracting(RowPage::getTitle).flatExtracting(Map::keySet).isEmpty();

        result = subj.list(filter, page(1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(2);
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).contains("sample");
        assertThat(content).extracting(RowPage::getTitle).flatExtracting(Map::keySet).isEmpty();
    }

    @Test
    public void listAllNoLanguages() {

        persist(withLang("home"));
        persist(withLang("sample"));

        PageFilter filter = new PageFilter();

        org.springframework.data.domain.Page<RowPage> result = subj.list(filter, page(0));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(2);
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).contains("home");
        assertThat(content).extracting(RowPage::getTitle).flatExtracting(Map::keySet).isEmpty();

        result = subj.list(filter, page(1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(2);
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).contains("sample");
        assertThat(content).extracting(RowPage::getTitle).flatExtracting(Map::keySet).isEmpty();
    }

    @Test
    public void listIdLanguages() {

        persist(withLang("home", "en", "ru"));
        persist(withLang("sample"));

        PageFilter filter = new PageFilter();
        filter.setId("oM");

        org.springframework.data.domain.Page<RowPage> result = subj.list(filter, page(0));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(1);
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).contains("home");
        assertThat(content).extracting(RowPage::getTitle).flatExtracting(Map::keySet).contains("en");
        assertThat(content).extracting(RowPage::getTitle).flatExtracting(Map::values).contains("home.en.title");

        result = subj.list(filter, page(1));

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

        org.springframework.data.domain.Page<RowPage> result = subj.list(filter, page(0));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(1);
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).contains("home");
        assertThat(content).extracting(RowPage::getTitle).flatExtracting(Map::keySet).isEmpty();

        result = subj.list(filter, page(1));

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
        filter.setTitle("mE.R");

        org.springframework.data.domain.Page<RowPage> result = subj.list(filter, page(0));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(1);
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).contains("home");
        assertThat(content).extracting(RowPage::getTitle).flatExtracting(Map::keySet).contains("en");
        assertThat(content).extracting(RowPage::getTitle).flatExtracting(Map::values).contains("home.en.title");

        result = subj.list(filter, page(1));

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

        org.springframework.data.domain.Page<RowPage> result = subj.list(filter, page(0));

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

        org.springframework.data.domain.Page<RowPage> result = subj.list(filter, page(0));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(1);
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).contains("home");
        assertThat(content).flatExtracting(RowTagged::getTags).extracting(RowTagged.Tag::getName).contains("a", "b");

        result = subj.list(filter, page(1));

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

        Optional<PropertyPage> result = subj.one("home");

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

        Optional<PropertyPage> result = subj.one("home");

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isFalse();
    }

    @Test
    public void oneNoLanguages() {

        persist(withLang("home"));
        persist(withLang("sample"));

        Optional<PropertyPage> result = subj.one("home");

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isFalse();
    }

    @Test
    public void oneLanguage() {

        persist(withLang("home", "en"));
        persist(withLang("sample"));

        Optional<PropertyPage> result = subj.one("home");

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

        Optional<PropertyPage> result = subj.one("home");

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isFalse();
    }

    @Test
    public void oneByTag() {

        persist(withTags("home", tag("a"), tag("b")));
        persist(withTags("sample", tag("a"), tag("b")));

        Optional<PropertyPage> result = subj.one("home", "a");

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

        Optional<PropertyPage> result = subj.one("home", "c");

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isFalse();
    }

    @Test
    public void oneByNoTag() {

        persist(withTags("home", tag("a"), tag("b")));

        Optional<PropertyPage> result = subj.one("home");

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

        List<TitlePage> result = subj.menu("a", "b");

        assertThat(result).isNotNull();
        assertThat(result).isEmpty();
    }

    @Test
    public void menuNoTag() {

        persist(withTags("home"));

        List<TitlePage> result = subj.menu();

        assertThat(result).isNotNull();
        assertThat(result).extracting(TitlePage::getId).contains("home");
        assertThat(result).extracting(TitlePage::getTitle).contains("home.en.title");
    }

    @Test
    public void menuByAllTags() {

        persist(withTags("home", tag("a"), tag("b")));

        List<TitlePage> result = subj.menu("a", "b");

        assertThat(result).isNotNull();
        assertThat(result).extracting(TitlePage::getId).contains("home");
        assertThat(result).extracting(TitlePage::getTitle).contains("home.en.title");
    }

    @Test
    public void menuActiveTags() {

        persist(withTags("home"));
        persist(withTags("test", tag("tag")));
        persist(withTags("sample", tag("tag")));
        persist(withTags("sample1", delayedTag("tag")));
        persist(withTags("sample2", expiredTag("tag")));

        List<TitlePage> result = subj.menu("tag");

        assertThat(result).isNotNull();
        assertThat(result).extracting(TitlePage::getId).contains("test", "sample");
        assertThat(result).extracting(TitlePage::getTitle).contains("test.en.title", "sample.en.title");
        assertThat(result).extracting(TitlePage::getTitle).isSorted();
    }

    @Test
    public void menuAnotherLanguage() {

        persist(withLang("home", "ru"));

        List<TitlePage> result = subj.menu();

        assertThat(result).isNotNull();
        assertThat(result).isEmpty();
    }
}
