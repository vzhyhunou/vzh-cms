package vzh.cms.model;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Data;

/**
 * @author Viktar Zhyhunou
 */
@Data
public class Wrapper {

    @JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, include = JsonTypeInfo.As.EXTERNAL_PROPERTY)
    private Object data;
}
