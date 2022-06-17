package vzh.cms.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.impl.DefaultClaims;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.stream.Collectors;

/**
 * @author Viktar Zhyhunou
 */
class CmsClaims extends DefaultClaims {

    CmsClaims(Authentication auth, String rolesKey) {
        setSubject(auth.getName());
        put(
                rolesKey,
                auth.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toSet())
        );
    }

    private String rolesKey;

    CmsClaims(Claims claims, String rolesKey) {
        super(claims);
        this.rolesKey = rolesKey;
    }

    @SuppressWarnings("unchecked")
    Collection<String> getRoles() {
        return (Collection<String>) get(rolesKey);
    }
}
