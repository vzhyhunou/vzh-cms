package vzh.cms.fixture;

import vzh.cms.model.User;

import java.util.Arrays;

public class UserFixture {

    public static User getUser(String id, String... tags) {
        User user = new User();
        user.setId(id);
        user.setPassword(id);
        user.getTags().addAll(Arrays.asList(tags));
        return user;
    }
}
