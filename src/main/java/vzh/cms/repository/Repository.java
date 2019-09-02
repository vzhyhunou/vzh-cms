package vzh.cms.repository;

import org.springframework.data.repository.query.Param;

import java.io.Serializable;
import java.util.List;

/**
 * @author Viktar Zhyhunou
 */
public interface Repository<T, ID extends Serializable> extends CustomizedRepository<T, ID> {

    List<T> findByIdIn(@Param("ids") ID[] ids);
}
