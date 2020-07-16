package vzh.cms.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.persistence.Transient;
import javax.validation.Valid;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * @author Viktar Zhyhunou
 */
@Data
@MappedSuperclass
abstract public class Item {

    private Date date;

    @ManyToOne
    @JsonIgnore
    private User user;

    public String getUserId() {
        return user == null ? null : user.getId();
    }

    public void setUserId(String userId) {
        user = new User();
        user.setId(userId);
    }

    @ElementCollection
    @Column(name = "tag")
    @CollectionTable
    @Valid
    private Set<Tag> tags = new HashSet<>();

    @Transient
    private Set<Base64File> files = new HashSet<>();
}
