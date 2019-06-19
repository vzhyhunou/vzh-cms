package vzh.cms.repository;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

abstract public class RepositoryTest extends BaseTest {

    protected static Pageable page(int i) {
        return PageRequest.of(i, 1, Sort.Direction.ASC, "id");
    }
}
