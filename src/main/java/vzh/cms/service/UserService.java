package vzh.cms.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vzh.cms.dto.UserFilter;
import vzh.cms.model.Tag;
import vzh.cms.model.Tag_;
import vzh.cms.model.Tagged_;
import vzh.cms.model.User;
import vzh.cms.model.User_;
import vzh.cms.projection.RowUser;
import vzh.cms.repository.UserRepository;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.Optional;

/**
 * @author Viktar Zhyhunou
 */
@Service
public class UserService extends TaggedService<User> {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        super(User.class);
        this.repository = repository;
    }

    public Page<RowUser> list(UserFilter filter, Pageable pageable) {
        return repository.findAll((root, q, b) -> {
            if (Long.class != q.getResultType()) {
                root.fetch(Tagged_.TAGS, JoinType.LEFT);
            }
            q.distinct(true);
            return filter(root, b, filter);
        }, RowUser.class, pageable);
    }

    @SuppressWarnings("unchecked")
    public Optional<User> withActiveRoles(String id) {
        return repository.findOne((root, q, b) -> {
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
