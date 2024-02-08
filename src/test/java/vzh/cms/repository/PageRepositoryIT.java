package vzh.cms.repository;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.i18n.LocaleContext;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ActiveProfiles;
import vzh.cms.dto.PageFilter;
import vzh.cms.projection.PropertyPage;
import vzh.cms.projection.RowPage;
import vzh.cms.projection.RowTagged;
import vzh.cms.projection.TitlePage;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static java.util.Locale.ENGLISH;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.context.i18n.LocaleContextHolder.setLocaleContext;
import static vzh.cms.fixture.PageFixture.withLang;
import static vzh.cms.fixture.PageFixture.withTags;
import static vzh.cms.fixture.TagFixture.*;
import static vzh.cms.model.PageTag.MENU;
import static vzh.cms.model.PageTag.PUBLISHED;

@ActiveProfiles("dev")
@DataJpaTest
public class PageRepositoryIT {

    @Autowired
    private TestEntityManager manager;

    @Autowired
    private PageRepository subj;

    @BeforeAll
    public static void before() {
        LocaleContext context = mock(LocaleContext.class);
        setLocaleContext(context);
        when(context.getLocale()).thenReturn(ENGLISH);
    }

    @Test
    public void listAllLanguages() {

        manager.persistAndFlush(withLang("home", "en", "ru"));
        manager.persistAndFlush(withLang("sample", "en", "ru"));

        PageFilter filter = new PageFilter();

        org.springframework.data.domain.Page<RowPage> result = subj.list(filter, PageRequest.of(0, 1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(2);
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).contains("home");
        assertThat(content).extracting(RowPage::getTitle).flatExtracting(Map::keySet).contains("en");
        assertThat(content).extracting(RowPage::getTitle).flatExtracting(Map::values).contains("home.en.title");

        result = subj.list(filter, PageRequest.of(1, 1));

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

        manager.persistAndFlush(withLang("home", "ru"));
        manager.persistAndFlush(withLang("sample", "ru"));

        PageFilter filter = new PageFilter();

        org.springframework.data.domain.Page<RowPage> result = subj.list(filter, PageRequest.of(0, 1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(2);
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).contains("home");
        assertThat(content).extracting(RowPage::getTitle).flatExtracting(Map::keySet).isEmpty();

        result = subj.list(filter, PageRequest.of(1, 1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(2);
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).contains("sample");
        assertThat(content).extracting(RowPage::getTitle).flatExtracting(Map::keySet).isEmpty();
    }

    @Test
    public void listAllNoLanguages() {

        manager.persistAndFlush(withLang("home"));
        manager.persistAndFlush(withLang("sample"));

        PageFilter filter = new PageFilter();

        org.springframework.data.domain.Page<RowPage> result = subj.list(filter, PageRequest.of(0, 1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(2);
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).contains("home");
        assertThat(content).extracting(RowPage::getTitle).flatExtracting(Map::keySet).isEmpty();

        result = subj.list(filter, PageRequest.of(1, 1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(2);
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).contains("sample");
        assertThat(content).extracting(RowPage::getTitle).flatExtracting(Map::keySet).isEmpty();
    }

    @Test
    public void listIdLanguages() {

        manager.persistAndFlush(withLang("home", "en", "ru"));
        manager.persistAndFlush(withLang("sample"));

        PageFilter filter = new PageFilter();
        filter.setId("oM");

        org.springframework.data.domain.Page<RowPage> result = subj.list(filter, PageRequest.of(0, 1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(1);
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).contains("home");
        assertThat(content).extracting(RowPage::getTitle).flatExtracting(Map::keySet).contains("en");
        assertThat(content).extracting(RowPage::getTitle).flatExtracting(Map::values).contains("home.en.title");

        result = subj.list(filter, PageRequest.of(1, 1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(1);
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).isEmpty();
    }

    @Test
    public void listIdNoLanguages() {

        manager.persistAndFlush(withLang("home"));
        manager.persistAndFlush(withLang("sample"));

        PageFilter filter = new PageFilter();
        filter.setId("oM");

        org.springframework.data.domain.Page<RowPage> result = subj.list(filter, PageRequest.of(0, 1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(1);
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).contains("home");
        assertThat(content).extracting(RowPage::getTitle).flatExtracting(Map::keySet).isEmpty();

        result = subj.list(filter, PageRequest.of(1, 1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(1);
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).isEmpty();
    }

    @Test
    public void listTitle() {

        manager.persistAndFlush(withLang("home", "en", "ru"));
        manager.persistAndFlush(withLang("sample", "en", "ru"));

        PageFilter filter = new PageFilter();
        filter.setTitle("mE.R");

        org.springframework.data.domain.Page<RowPage> result = subj.list(filter, PageRequest.of(0, 1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(1);
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).contains("home");
        assertThat(content).extracting(RowPage::getTitle).flatExtracting(Map::keySet).contains("en");
        assertThat(content).extracting(RowPage::getTitle).flatExtracting(Map::values).contains("home.en.title");

        result = subj.list(filter, PageRequest.of(1, 1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(1);
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).isEmpty();
    }

    @Test
    public void listNoTags() {

        manager.persistAndFlush(withTags("home"));

        PageFilter filter = new PageFilter();
        filter.setTags(new String[]{"a"});

        org.springframework.data.domain.Page<RowPage> result = subj.list(filter, PageRequest.of(0, 1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(0);
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).isEmpty();
    }

    @Test
    public void listAllTags() {

        manager.persistAndFlush(withTags("home", tag("a"), tag("b")));
        manager.persistAndFlush(withTags("sample", tag("c"), tag("d")));

        PageFilter filter = new PageFilter();
        filter.setTags(new String[]{"a"});

        org.springframework.data.domain.Page<RowPage> result = subj.list(filter, PageRequest.of(0, 1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(1);
        List<RowPage> content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).extracting(RowPage::getId).contains("home");
        assertThat(content).flatExtracting(RowTagged::getTags).extracting(RowTagged.Tag::getName).contains("a", "b");

        result = subj.list(filter, PageRequest.of(1, 1));

        assertThat(result).isNotNull();
        assertThat(result.getTotalPages()).isEqualTo(1);
        content = result.getContent();
        assertThat(content).isNotNull();
        assertThat(content).isEmpty();
    }

    @Test
    public void oneAllLanguages() {

        manager.persistAndFlush(withLang("home", "en", "ru"));
        manager.persistAndFlush(withLang("sample"));

        Optional<PropertyPage> result = subj.one("home", true);

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isTrue();

        PropertyPage page = result.get();

        assertThat(page).isNotNull();
        assertThat(page.getTitle()).isEqualTo("home.en.title");
        assertThat(page.getContent()).isEqualTo("home.en.content");
    }

    @Test
    public void oneNone() {

        manager.persistAndFlush(withLang("sample"));

        Optional<PropertyPage> result = subj.one("home", true);

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isFalse();
    }

    @Test
    public void oneNoLanguages() {

        manager.persistAndFlush(withLang("home"));
        manager.persistAndFlush(withLang("sample"));

        Optional<PropertyPage> result = subj.one("home", true);

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isFalse();
    }

    @Test
    public void oneLanguage() {

        manager.persistAndFlush(withLang("home", "en"));
        manager.persistAndFlush(withLang("sample"));

        Optional<PropertyPage> result = subj.one("home", true);

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isTrue();

        PropertyPage page = result.get();

        assertThat(page).isNotNull();
        assertThat(page.getTitle()).isEqualTo("home.en.title");
        assertThat(page.getContent()).isEqualTo("home.en.content");
    }

    @Test
    public void oneAnotherLanguage() {

        manager.persistAndFlush(withLang("home", "ru"));
        manager.persistAndFlush(withLang("sample"));

        Optional<PropertyPage> result = subj.one("home", true);

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isFalse();
    }

    @Test
    public void onePublishedTag() {

        manager.persistAndFlush(withTags("home", tag(PUBLISHED.name()), tag("b")));
        manager.persistAndFlush(withTags("sample", tag("a"), tag("b")));

        Optional<PropertyPage> result = subj.one("home", false);

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isTrue();

        PropertyPage page = result.get();

        assertThat(page).isNotNull();
        assertThat(page.getTitle()).isEqualTo("home.en.title");
        assertThat(page.getContent()).isEqualTo("home.en.content");
    }

    @Test
    public void oneNoPublishedTag() {

        manager.persistAndFlush(withTags("home", tag("a"), tag("b")));

        Optional<PropertyPage> result = subj.one("home", false);

        assertThat(result).isNotNull();
        assertThat(result.isPresent()).isFalse();
    }

    @Test
    public void menuNoTag() {

        manager.persistAndFlush(withTags("home", tag("a")));

        List<TitlePage> result = subj.menu();

        assertThat(result).isNotNull();
        assertThat(result).isEmpty();
    }

    @Test
    public void menuTag() {

        manager.persistAndFlush(withTags("home", tag(MENU.name())));

        List<TitlePage> result = subj.menu();

        assertThat(result).isNotNull();
        assertThat(result).extracting(TitlePage::getId).contains("home");
        assertThat(result).extracting(TitlePage::getTitle).contains("home.en.title");
    }

    @Test
    public void menuActiveTag() {

        manager.persistAndFlush(withTags("home"));
        manager.persistAndFlush(withTags("test", tag(MENU.name())));
        manager.persistAndFlush(withTags("sample", tag(MENU.name())));
        manager.persistAndFlush(withTags("sample1", delayedTag(MENU.name())));
        manager.persistAndFlush(withTags("sample2", expiredTag(MENU.name())));

        List<TitlePage> result = subj.menu();

        assertThat(result).isNotNull();
        assertThat(result).extracting(TitlePage::getId).contains("test", "sample");
        assertThat(result).extracting(TitlePage::getTitle).contains("test.en.title", "sample.en.title");
        assertThat(result).extracting(TitlePage::getTitle).isSorted();
    }

    @Test
    public void menuAnotherLanguage() {

        manager.persistAndFlush(withLang("home", "ru"));

        List<TitlePage> result = subj.menu();

        assertThat(result).isNotNull();
        assertThat(result).isEmpty();
    }
}
