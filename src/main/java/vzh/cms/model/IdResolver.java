package vzh.cms.model;

import com.fasterxml.jackson.annotation.ObjectIdGenerator;
import com.fasterxml.jackson.annotation.ObjectIdResolver;
import org.springframework.beans.BeanWrapperImpl;

import javax.persistence.Id;
import java.lang.reflect.Field;
import java.util.Arrays;

/**
 * @author Viktar Zhyhunou
 */
public class IdResolver implements ObjectIdResolver {

    @Override
    public void bindItem(ObjectIdGenerator.IdKey id, Object pojo) {
    }

    @Override
    public Object resolveId(ObjectIdGenerator.IdKey id) {
        try {
            Object instance = id.scope.newInstance();
            BeanWrapperImpl dst = new BeanWrapperImpl(instance);
            Arrays.stream(id.scope.getDeclaredFields())
                    .filter(f -> Arrays.stream(f.getDeclaredAnnotations()).anyMatch(a -> a instanceof Id))
                    .map(Field::getName)
                    .forEach(n -> dst.setPropertyValue(n, id.key));
            return instance;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
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