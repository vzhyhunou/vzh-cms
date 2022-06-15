package vzh.cms.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("dev")
@DataJpaTest
abstract public class RepositoryIT {

    @Autowired
    private TestEntityManager manager;

    protected void persist(Object obj) {
        manager.persistAndFlush(obj);
        manager.clear();
    }

    protected static Pageable page(int i) {
        return PageRequest.of(i, 1, Sort.Direction.ASC, "id");
    }
}
