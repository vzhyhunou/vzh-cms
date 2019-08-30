package vzh.cms.repository;

import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import vzh.cms.consumer.FilesContentConsumer;

@RunWith(SpringRunner.class)
@ActiveProfiles(profiles = "dev")
@DataJpaTest
abstract public class BaseTest {

    @MockBean
    private FilesContentConsumer filesContentConsumer;

    @Autowired
    private TestEntityManager manager;

    protected void persist(Object obj) {
        manager.persistAndFlush(obj);
        manager.clear();
    }
}
