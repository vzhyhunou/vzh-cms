package vzh.cms.service;

import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;
import vzh.cms.model.Page;
import vzh.cms.model.Tag;

import java.io.IOException;
import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;
import static vzh.cms.fixture.PageFixture.withDateAndTags;
import static vzh.cms.fixture.TagFixture.tag;
import static vzh.cms.service.EntityService.Consumer;

@ActiveProfiles("dev")
@DataJpaTest
@Import(EntityService.class)
public class EntityServiceIT {

    @Autowired
    private TestEntityManager manager;

    @Autowired
    private EntityService subj;

    @Mock
    private Consumer<Page> consumer;

    @Captor
    ArgumentCaptor<Page> captor;

    @Test
    @SuppressWarnings("unchecked")
    public void findAll() throws IOException {
        manager.persistAndFlush(withDateAndTags("a", null, tag("b")));

        boolean result = subj.consume(Page.class, 0, null, consumer);

        assertThat(result).isTrue();
        verify(consumer).accept(captor.capture());
        Page page = captor.getValue();
        assertThat(page).isNotNull();
        assertThat(page.getId()).isEqualTo("a");
        assertThat(page.getTags()).extracting(Tag::getName).contains("b");

        reset(consumer);

        result = subj.consume(Page.class, 1, null, consumer);

        assertThat(result).isFalse();
        verifyNoInteractions(consumer);
    }

    @Test
    @SuppressWarnings("unchecked")
    public void findAllByDate() throws IOException {
        manager.persistAndFlush(withDateAndTags("a", new Date(1), tag("b")));
        manager.persistAndFlush(withDateAndTags("c", new Date(2), tag("d")));

        boolean result = subj.consume(Page.class, 0, new Date(1), consumer);

        assertThat(result).isTrue();
        verify(consumer).accept(captor.capture());
        Page page = captor.getValue();
        assertThat(page).isNotNull();
        assertThat(page.getId()).isEqualTo("c");
        assertThat(page.getTags()).extracting(Tag::getName).contains("d");

        reset(consumer);

        result = subj.consume(Page.class, 1, new Date(1), consumer);

        assertThat(result).isFalse();
        verifyNoInteractions(consumer);
    }
}
