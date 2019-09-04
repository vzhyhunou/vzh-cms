package vzh.cms.repository;

import org.springframework.data.domain.Pageable;
import vzh.cms.dto.UserFilter;
import vzh.cms.model.Item_;
import vzh.cms.model.Tag;
import vzh.cms.model.Tag_;
import vzh.cms.model.User;
import vzh.cms.model.User_;
import vzh.cms.projection.RowUser;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;
import java.util.Objects;
import java.util.stream.Stream;

/**
 * @author Viktar Zhyhunou
 */
class UserRepositoryImpl extends ItemRepositoryImpl<User, String> implements CustomizedUserRepository {

    UserRepositoryImpl(EntityManager manager) {
        super(User.class, manager);
    }

    public org.springframework.data.domain.Page<RowUser> list(UserFilter filter, Pageable pageable) {
        return findAll((root, q, b) -> {
            Subquery<User> subquery = q.subquery(User.class);
            Root<User> p = subquery.from(User.class);
            if (Long.class != q.getResultType()) {
                root.fetch(Item_.TAGS, JoinType.LEFT);
            }
            return root.in(subquery.select(p).where(filter(p, b, filter)));
        }, RowUser.class, pageable);
    }

    private static Predicate filter(Root<User> root, CriteriaBuilder b, UserFilter filter) {
        Join<User, Tag> tags = root.join(Item_.TAGS, JoinType.LEFT);
        return b.and(Stream.of(
                like(b, root.get(User_.id), filter.getId()),
                in(tags.get(Tag_.name), filter.getTags())
        ).filter(Objects::nonNull).toArray(Predicate[]::new));
    }
}
