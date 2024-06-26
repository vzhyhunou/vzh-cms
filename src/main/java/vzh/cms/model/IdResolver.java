package vzh.cms.model;

import com.fasterxml.jackson.annotation.ObjectIdGenerator;
import com.fasterxml.jackson.annotation.ObjectIdResolver;
import vzh.cms.component.ApplicationContextProvider;

import javax.persistence.EntityManager;

/**
 * @author Viktar Zhyhunou
 */
public class IdResolver implements ObjectIdResolver {

    private final EntityManager em;

    public IdResolver() {
        em = ApplicationContextProvider.getContext().getBean(EntityManager.class);
    }

    @Override
    public void bindItem(ObjectIdGenerator.IdKey id, Object pojo) {
    }

    @Override
    public Object resolveId(ObjectIdGenerator.IdKey id) {
        return em.find(id.scope, id.key);
    }

    @Override
    public ObjectIdResolver newForDeserialization(Object context) {
        return this;
    }

    @Override
    public boolean canUseFor(ObjectIdResolver resolverType) {
        return false;
    }
}