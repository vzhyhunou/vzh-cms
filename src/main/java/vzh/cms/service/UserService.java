package vzh.cms.service;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import vzh.cms.dto.UserFilter;
import vzh.cms.model.User;
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
public class UserService extends BaseService<UserRepository> {

    public UserService(UserRepository repository) {
        super(repository);
    }

    public org.springframework.data.domain.Page<User> list(UserFilter filter, Pageable pageable) {
        return repository.findAll((root, q, b) -> {
            if (Long.class == q.getResultType()) {
                q.distinct(true);
            } else {
                root.fetch("tags", JoinType.LEFT);
            }
            Subquery<User> subquery = q.subquery(User.class);
            Root<User> p = subquery.from(User.class);
            return root.in(subquery.select(p).where(filter(p, b, filter)));
        }, pageable);
    }

    private static Predicate filter(Root<User> root, CriteriaBuilder b, UserFilter filter) {
        Join<User, String[]> tags = root.join("tags", JoinType.LEFT);
        return b.and(Stream.of(
                like(b, root.get("id"), filter.getId()),
                in(tags, filter.getTags())
        ).filter(Objects::nonNull).toArray(Predicate[]::new));
    }
}
