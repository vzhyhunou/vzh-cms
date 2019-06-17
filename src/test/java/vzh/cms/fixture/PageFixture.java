package vzh.cms.fixture;

import vzh.cms.model.Page;
import vzh.cms.model.PageProperty;

import java.util.Arrays;

public class PageFixture {

    public static Page getPageByTags(String id, String... tags) {
        Page page = new Page();
        page.setId(id);
        page.getTags().addAll(Arrays.asList(tags));
        PageProperty property = new PageProperty();
        property.setTitle(String.format("%s.title", id));
        property.setContent(String.format("%s.content", id));
        page.getProperties().put("en", property);
        page.getProperties().put("ru", property);
        return page;
    }

    public static Page getPageByLang(String id, String... langs) {
        Page page = new Page();
        page.setId(id);
        Arrays.stream(langs).forEach(l -> {
            PageProperty property = new PageProperty();
            property.setTitle(String.format("%s.%s.title", id, l));
            property.setContent(String.format("%s.%s.content", id, l));
            page.getProperties().put(l, property);
        });
        return page;
    }
}
