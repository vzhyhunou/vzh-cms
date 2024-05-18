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
import java.util.Date;
import java.util.Iterator;

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

    public <T extends Item> Iterable<T> findAll(Class<T> type, Date date) {
        return () -> new Iterator<T>() {

            private int index = 0;
            private T next;

            @Override
            public boolean hasNext() {
                upd();
                return next != null;
            }

            @Override
            public T next() {
                upd();
                try {
                    return next;
                } finally {
                    next = null;
                }
            }

            private void upd() {
                if (next == null) {
                    em.clear();
                    next = query().setFirstResult(index++).setMaxResults(1).getResultStream().findFirst().orElse(null);
                }
            }

            private TypedQuery<T> query() {
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
        };
    }
}
