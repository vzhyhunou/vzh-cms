package vzh.cms.repository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;
import vzh.cms.model.Page;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.assertNotNull;

@RunWith(SpringRunner.class)
@DataJpaTest
public class PageRepositoryTest {

    @Autowired
    private TestEntityManager manager;

    @Autowired
    private PageRepository repository;

    @Test
    public void findByIdContaining() {

        Page page = new Page();
        page.setId("home");
        manager.persist(page);

        org.springframework.data.domain.Page<Page> result = repository.findByIdContaining(page.getId(), null);

        assertNotNull(result);
        assertThat(result.getContent()).extracting(Page::getId).containsOnly(page.getId());
    }
}
