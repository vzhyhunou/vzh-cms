package vzh.cms.fixture;

import vzh.cms.model.PageProperty;

public class PagePropertyFixture {

    public static PageProperty property(String title, String content) {
        PageProperty property = new PageProperty();
        property.setTitle(title);
        property.setContent(content);
        return property;
    }
}
