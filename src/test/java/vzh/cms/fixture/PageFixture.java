package vzh.cms.fixture;

import vzh.cms.model.Page;
import vzh.cms.model.Tag;

import java.util.Arrays;
import java.util.stream.Stream;

import static vzh.cms.fixture.PagePropertyFixture.property;
import static vzh.cms.fixture.TagFixture.tag;

public class PageFixture {

    public static Page withTags(String id, Tag... tags) {
        Page page = new Page();
        page.setId(id);
        page.getTags().addAll(Arrays.asList(tags));
        Stream.of("en", "ru").forEach(l ->
                page.getProperties().put(l, property(String.format("%s.%s.title", id, l), String.format("%s.%s.content", id, l)))
        );
        return page;
    }

    public static Page withLang(String id, String... langs) {
        Page page = new Page();
        page.setId(id);
        Stream.of(0, 1).forEach(i ->
                page.getTags().add(tag(String.format("%d.tag", i)))
        );
        Arrays.stream(langs).forEach(l ->
                page.getProperties().put(l, property(String.format("%s.%s.title", id, l), String.format("%s.%s.content", id, l)))
        );
        return page;
    }
}
