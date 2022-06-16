package vzh.cms.service;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.rest.core.mapping.ResourceMappings;
import org.springframework.data.rest.core.mapping.ResourceMetadata;
import org.springframework.hateoas.LinkRelation;
import vzh.cms.model.Item;

import javax.persistence.EntityManagerFactory;
import javax.persistence.PersistenceUnitUtil;

import static java.io.File.separator;
import static java.util.Arrays.asList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class LocationServiceTest {

    @Mock
    private ResourceMappings mappings;

    @Mock
    private EntityManagerFactory factory;

    @InjectMocks
    private LocationService subj;

    @AfterEach
    public void after() {
        verifyNoMoreInteractions(mappings, factory);
    }

    @Test
    public void location() {

        ResourceMetadata meta = mock(ResourceMetadata.class);
        when(mappings.getMetadataFor(any())).thenReturn(meta);
        LinkRelation rel = mock(LinkRelation.class);
        when(meta.getRel()).thenReturn(rel);
        when(rel.value()).thenReturn("resource");

        PersistenceUnitUtil util = mock(PersistenceUnitUtil.class);
        when(factory.getPersistenceUnitUtil()).thenReturn(util);
        when(util.getIdentifier(any())).thenReturn("a.b");

        Item item = new Item() {
            @Override
            public Object[] getParents() {
                return new Object[]{1, "2.3"};
            }
        };

        String result = subj.location(item);

        assertThat(result).isEqualTo(String.join(separator, asList("resource", "1", "2", "3", "a", "b")));
        verifyNoMoreInteractions(meta, rel, util);
    }
}
