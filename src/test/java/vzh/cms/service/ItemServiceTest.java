package vzh.cms.service;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
abstract class ItemServiceTest {

    @Autowired
    private TestEntityManager manager;

    protected static Pageable page(int i) {
        return PageRequest.of(i, 1, Sort.Direction.ASC, "id");
    }

    protected void persist(Object obj) {
        manager.persistAndFlush(obj);
        manager.clear();
    }
}
