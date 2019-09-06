package vzh.cms.repository;

import vzh.cms.model.Content;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

/**
 * @author Viktar Zhyhunou
 */
interface CustomizedContentRepository<T extends Content, ID extends Serializable> extends CustomizedRepository<T> {

    <E> Optional<E> content(ID id, Class<E> type);

    <E> List<E> contentsByActiveTags(Class<E> type, Object... names);
}
