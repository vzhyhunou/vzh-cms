package vzh.cms.repository;

import vzh.cms.model.Content;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

/**
 * @author Viktar Zhyhunou
 */
interface CustomizedContentRepository<T extends Content, ID extends Serializable> extends CustomizedRepository<T> {

    <E> Optional<E> contentByActiveTags(ID id, Class<E> type, Object... names);

    <E> List<E> contentsByActiveTags(Class<E> type, String order, Object... names);
}
