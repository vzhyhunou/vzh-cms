package vzh.cms.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

/**
 * @author Viktar Zhyhunou
 */
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Data
@ToString
public class Base64File {

    @EqualsAndHashCode.Include
    private String name;

    @ToString.Exclude
    private String data;
}
