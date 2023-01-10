package vzh.cms.security;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import vzh.cms.model.Tag;

import java.util.stream.Collectors;

/**
 * @author Viktar Zhyhunou
 */
public class CmsUser extends User {

    private static final String PREFIX = "ROLE_";

    CmsUser(CmsClaims claims) {
        super(
                claims.getSubject(),
                "",
                claims.getRoles().stream()
                        .map(PREFIX::concat)
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toSet())
        );
    }

    CmsUser(vzh.cms.model.User user) {
        super(
                user.getId(),
                user.getPassword(),
                user.getTags().stream()
                        .map(Tag::getName)
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toSet())
        );
    }
}
