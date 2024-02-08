package vzh.cms.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import vzh.cms.model.Page;

import java.util.Date;
import java.util.Iterator;

import static org.assertj.core.api.Assertions.assertThat;
import static vzh.cms.fixture.PageFixture.withDate;

@ActiveProfiles("dev")
@DataJpaTest
@Import(EntityService.class)
public class EntityServiceIT {

    @Autowired
    private TestEntityManager manager;

    @Autowired
    private EntityService subj;

    @Test
    public void findAll() {
        manager.persistAndFlush(withDate("a", null));

        Iterable<Page> result = subj.findAll(Page.class, null);

        assertThat(result).isNotNull();
        Iterator<Page> iterator = result.iterator();
        assertThat(iterator).isNotNull();

        assertThat(iterator.hasNext()).isTrue();
        Page page = iterator.next();
        assertThat(page).isNotNull();
        assertThat(page.getId()).isEqualTo("a");

        assertThat(iterator.hasNext()).isFalse();
        page = iterator.next();
        assertThat(page).isNull();
    }

    @Test
    public void findAllByDate() {
        manager.persistAndFlush(withDate("a", new Date(1)));
        manager.persistAndFlush(withDate("b", new Date(2)));

        Iterable<Page> result = subj.findAll(Page.class, new Date(1));

        assertThat(result).isNotNull();
        Iterator<Page> iterator = result.iterator();
        assertThat(iterator).isNotNull();

        assertThat(iterator.hasNext()).isTrue();
        Page page = iterator.next();
        assertThat(page).isNotNull();
        assertThat(page.getId()).isEqualTo("b");

        assertThat(iterator.hasNext()).isFalse();
        page = iterator.next();
        assertThat(page).isNull();
    }
}
