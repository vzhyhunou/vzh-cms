package vzh.cms.security;

import lombok.Getter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;
import java.util.stream.Collectors;

/**
 * @author Viktar Zhyhunou
 */
@Getter
public class CmsUser extends User {

    public CmsUser(String subject, Collection<String> roles) {
        super(
                subject,
                "",
                roles.stream()
                        .map(r -> String.format("ROLE_%s", r))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toSet())
        );
    }

    public CmsUser(String subject, String password, Collection<String> roles) {
        super(
                subject,
                password,
                roles.stream()
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toSet())
        );
    }
}
