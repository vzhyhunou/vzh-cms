package vzh.cms.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import static javax.persistence.FetchType.LAZY;

/**
 * @author Viktar Zhyhunou
 */
@Data
@MappedSuperclass
abstract public class Item {

    private Date date;

    @ManyToOne(fetch = LAZY)
    @JsonIgnore
    private User user;

    public String getUserId() {
        return user == null ? null : user.getId();
    }

    public void setUserId(String userId) {
        if (userId != null) {
            user = new User();
            user.setId(userId);
        }
    }

    @Transient
    private Set<Base64File> files = new HashSet<>();

    public Object[] getParents() {
        return new Object[]{};
    }
}
