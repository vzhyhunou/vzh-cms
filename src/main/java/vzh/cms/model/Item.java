package vzh.cms.model;

import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;

import static javax.persistence.FetchType.LAZY;

/**
 * @author Viktar Zhyhunou
 */
@Data
@ToString
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
abstract public class Item {

    @LastModifiedDate
    private Date date;

    @ManyToOne(fetch = LAZY)
    @JsonIgnore
    @ToString.Exclude
    @LastModifiedBy
    private User user;

    @JsonIdentityReference(alwaysAsId = true)
    public User getUserId() {
        return user;
    }

    public void setUserId(User user) {
        this.user = user;
    }

    @Transient
    private Collection<Base64File> files = new HashSet<>();

    @ExportIgnore
    public Object[] getParents() {
        return new Object[]{};
    }

    @Version
    private Long version;
}
