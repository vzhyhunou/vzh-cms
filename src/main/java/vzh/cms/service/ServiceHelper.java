package vzh.cms.service;

import java.io.File;

import static org.apache.commons.beanutils.BeanUtils.getProperty;

/**
 * @author Viktar Zhyhunou
 */
class ServiceHelper {
    static String pathById(Object entity) throws Exception {
        return getProperty(entity, "id").replace('.', File.separatorChar);
    }
}
