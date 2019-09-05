package vzh.cms.repository;

import vzh.cms.model.Content;

import java.util.List;
import java.util.Optional;

/**
 * @author Viktar Zhyhunou
 */
interface CustomizedContentRepository<T extends Content> extends CustomizedRepository<T> {

    <E> Optional<E> content(Object id, Class<E> type);

    <E> List<E> contentsByActiveTags(Class<E> type, String... names);
}
