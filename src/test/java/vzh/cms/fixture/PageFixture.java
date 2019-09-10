package vzh.cms.fixture;

import vzh.cms.model.Page;
import vzh.cms.model.Tag;

import java.util.Arrays;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static vzh.cms.fixture.PagePropertyFixture.property;
import static vzh.cms.fixture.TagFixture.tag;

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
        page.getTags().addAll(Stream.of(0, 1).map(i -> tag(String.format("%d.tag", i))).collect(Collectors.toSet()));
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
