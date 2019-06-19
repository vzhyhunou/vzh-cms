package vzh.cms.repository;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
abstract public class BaseTest {

    @Autowired
    private TestEntityManager manager;

    protected void persist(Object obj) {
        manager.persistAndFlush(obj);
        manager.clear();
    }
}
