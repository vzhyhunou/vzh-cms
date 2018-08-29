package vzh.cms.model;

import java.util.Map;

/**
 * @author Viktar Zhyhunou
 */
public interface Localized<T> {

    Map<String, T> getProperties();

    void setProperties(Map<String, T> properties);
}
