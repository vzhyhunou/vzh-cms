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
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import javax.persistence.criteria.Subquery;
import java.util.Optional;

/**
 * @author Viktar Zhyhunou
 */
class UserRepositoryImpl extends TaggedRepositoryImpl<User, String> implements CustomizedUserRepository {

    UserRepositoryImpl(EntityManager manager) {
        super(User.class, manager);
    }

    @Override
    public Page<RowUser> list(UserFilter filter, Pageable pageable) {
        return findAll((root, q, b) -> {
            Subquery<User> subquery = q.subquery(User.class);
            Root<User> p = subquery.from(User.class);
            if (Long.class != q.getResultType()) {
                root.fetch(Tagged_.TAGS, JoinType.LEFT);
            }
            return root.in(subquery.select(p).where(filter(p, b, filter)));
        }, RowUser.class, pageable);
    }

    @Override
    @SuppressWarnings("unchecked")
    public Optional<User> withActiveRoles(String id) {
        return findOne((root, q, b) -> {
                    Path<Tag> tags = (Path<Tag>) root.fetch(Tagged_.TAGS, JoinType.LEFT);
                    return b.and(
                            b.equal(root.get(User_.ID), id),
                            b.or(
                                    b.and(
                                            b.like(tags.get(Tag_.name), "ROLE_%"),
                                            active(b, tags)
                                    ),
                                    b.isNull(tags.get(Tag_.name))
                            )
                    );
                }
        );
    }

    private static Predicate filter(Root<User> root, CriteriaBuilder b, UserFilter filter) {
        Join<User, Tag> tags = root.join(Tagged_.TAGS, JoinType.LEFT);
        return b.and(nonNull(
                contains(b, root.get(User_.id), filter.getId()),
                in(tags.get(Tag_.name), filter.getTags())
        ));
    }
}
