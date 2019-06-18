package vzh.cms.repository;

import vzh.cms.model.Item;

import javax.persistence.EntityManager;
import java.io.Serializable;

/**
 * @author Viktar Zhyhunou
 */
abstract class ItemRepositoryImpl<T extends Item, ID extends Serializable> extends RepositoryImpl<T, ID> implements ItemRepository<T> {

    protected ItemRepositoryImpl(Class<T> domainClass, EntityManager manager) {
        super(domainClass, manager);
    }
}
