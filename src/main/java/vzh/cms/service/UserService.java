package vzh.cms.service;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vzh.cms.dto.UserFilter;
import vzh.cms.model.Tag;
import vzh.cms.model.User;
import vzh.cms.projection.RowUser;
import vzh.cms.repository.UserRepository;

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
@Service
public class UserService extends BaseService {

    private UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public org.springframework.data.domain.Page<RowUser> list(UserFilter filter, Pageable pageable) {
        return repository.findAll((root, q, b) -> {
            if (Long.class == q.getResultType()) {
                q.distinct(true);
            } else {
                root.fetch("tags", JoinType.LEFT);
            }
            Subquery<User> subquery = q.subquery(User.class);
            Root<User> p = subquery.from(User.class);
            return root.in(subquery.select(p).where(filter(p, b, filter)));
        }, RowUser.class, pageable);
    }

    private static Predicate filter(Root<User> root, CriteriaBuilder b, UserFilter filter) {
        Join<User, Tag> tags = root.join("tags", JoinType.LEFT);
        return b.and(Stream.of(
                like(b, root.get("id"), filter.getId()),
                in(tags.get("name"), filter.getTags())
        ).filter(Objects::nonNull).toArray(Predicate[]::new));
    }
}
