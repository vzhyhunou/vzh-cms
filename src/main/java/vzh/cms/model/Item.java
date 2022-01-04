package vzh.cms.model;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;

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
@ToString
@MappedSuperclass
abstract public class Item {

    private Date date;

    @ManyToOne(fetch = LAZY)
    @JsonIgnore
    @ToString.Exclude
    private User user;

    @JsonIdentityReference(alwaysAsId = true)
    public User getUserId() {
        return user;
    }

    public void setUserId(User user) {
        this.user = user;
    }

    @Transient
    private Set<Base64File> files = new HashSet<>();

    public Object[] getParents() {
        return new Object[]{};
    }
}
