package vzh.cms.fixture;

import vzh.cms.model.Page;
import vzh.cms.model.Tag;

import java.util.Arrays;

import static vzh.cms.fixture.PagePropertyFixture.property;

public class PageFixture {

    public static Page withTags(String id, Tag... tags) {
        Page page = new Page();
        page.setId(id);
        page.getTags().addAll(Arrays.asList(tags));
        createProperties(page, "en", "ru");
        return page;
    }

    public static Page withLang(String id, String... langs) {
        Page page = new Page();
        page.setId(id);
        createProperties(page, langs);
        return page;
    }

    private static void createProperties(Page page, String... langs) {
        Arrays.stream(langs).forEach(l ->
                page.getProperties().put(l, property(
                        String.format("%s.%s.title", page.getId(), l),
                        String.format("%s.%s.content", page.getId(), l)
                ))
        );
    }
}
