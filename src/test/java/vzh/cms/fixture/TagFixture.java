package vzh.cms.fixture;

import vzh.cms.model.Tag;

import java.util.Date;

public class TagFixture {

    public static Tag tag(String name) {
        Tag tag = new Tag();
        tag.setName(name);
        return tag;
    }

    public static Tag delayedTag(String name) {
        Tag tag = tag(name);
        tag.setStart(new Date(System.currentTimeMillis() + Integer.MAX_VALUE));
        return tag;
    }

    public static Tag expiredTag(String name) {
        Tag tag = tag(name);
        tag.setEnd(new Date(0));
        return tag;
    }
}
