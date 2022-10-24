package vzh.cms.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import vzh.cms.dto.UserFilter;
import vzh.cms.model.Tag;
import vzh.cms.model.Tag_;
import vzh.cms.model.Tagged_;
import vzh.cms.model.User;
import vzh.cms.model.User_;
import vzh.cms.projection.RowUser;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.Optional;

/**
 * @author Viktar Zhyhunou
 */
public class UserRepositoryImpl extends TaggedRepositoryImpl<User, String> implements CustomizedUserRepository {

    public UserRepositoryImpl(EntityManager em) {
        super(User.class, em);
    }

    public Page<RowUser> list(UserFilter filter, Pageable pageable) {
        return findAll((root, q, b) -> {
            if (Long.class != q.getResultType()) {
                root.fetch(Tagged_.TAGS, JoinType.LEFT);
            }
            q.distinct(true);
            return filter(root, b, filter);
        }, RowUser.class, pageable);
    }

    @SuppressWarnings("unchecked")
    public Optional<User> withActiveRoles(String id) {
        return findOne((root, q, b) -> {
            Path<Tag> tags = (Path<Tag>) root.fetch(Tagged_.TAGS, JoinType.LEFT);
            return b.and(
                    b.equal(root.get(User_.id), id),
                    b.or(
                            active(b, tags),
                            b.isNull(tags.get(Tag_.name))
                    )
            );
        });
    }

    protected static Predicate filter(Root<User> root, CriteriaBuilder b, UserFilter filter) {
        Path<Tag> tags = root.join(Tagged_.TAGS, JoinType.LEFT);
        return b.and(
                contains(b, root.get(User_.id), filter.getId()),
                in(b, tags.get(Tag_.name), filter.getTags())
        );
    }
}
