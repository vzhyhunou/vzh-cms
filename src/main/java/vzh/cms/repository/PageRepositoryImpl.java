package vzh.cms.repository;

import vzh.cms.model.Page;
import vzh.cms.model.PageProperty;

import javax.persistence.EntityManager;

/**
 * @author Viktar Zhyhunou
 */
public class PageRepositoryImpl extends LocalizedRepositoryImpl<Page, PageProperty, String> {

    public PageRepositoryImpl(EntityManager manager) {
        super(Page.class, manager);
    }
}
