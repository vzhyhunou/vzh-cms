package vzh.cms.repository;

import vzh.cms.model.Item;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

/**
 * @author Viktar Zhyhunou
 */
public interface CustomizedContentRepository<T extends Item, ID extends Serializable> extends CustomizedRepository<T> {

    <E> Optional<E> contentByActiveTags(ID id, Class<E> type, Object... names);

    <E> List<E> contentsByActiveTags(Class<E> type, String order, Object... names);
}
