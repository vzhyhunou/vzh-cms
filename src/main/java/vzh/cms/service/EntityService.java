package vzh.cms.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import vzh.cms.model.Item;
import vzh.cms.model.Item_;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.ParameterExpression;
import javax.persistence.criteria.Root;
import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Date;

/**
 * @author Viktar Zhyhunou
 */
@Service
@RequiredArgsConstructor
public class EntityService {

    private final EntityManagerFactory emf;

    private final EntityManager em;

    @SuppressWarnings("unchecked")
    public <T> T find(T item) {
        em.clear();
        return em.find((Class<T>) item.getClass(), emf.getPersistenceUnitUtil().getIdentifier(item));
    }

    @Transactional
    public void create(Item item) {
        em.persist(item);
        em.flush();
        em.clear();
    }

    @Transactional
    public void update(Item item) {
        item.setVersion(find(item).getVersion());
        em.merge(item);
        em.flush();
        em.clear();
    }

    @Transactional
    public <T extends Item> boolean consume(Class<T> type, int index, Date date, Consumer<T> consumer) throws IOException {
        em.clear();
        T item = query(type, date).setFirstResult(index).setMaxResults(1).getResultStream().findFirst().orElse(null);
        if (item == null) {
            return false;
        }
        consumer.accept(item);
        return true;
    }

    private <T extends Item> TypedQuery<T> query(Class<T> type, Date date) {
        CriteriaBuilder b = em.getCriteriaBuilder();
        CriteriaQuery<T> q = b.createQuery(type);
        Root<T> c = q.from(type);
        q.select(c);
        if (date == null) {
            return em.createQuery(q);
        }
        ParameterExpression<Date> p = b.parameter(Date.class);
        q.where(b.greaterThan(c.get(Item_.date), p));
        return em.createQuery(q).setParameter(p, date);
    }

    public interface Consumer<T> {
        void accept(T item) throws IOException;
    }
}
