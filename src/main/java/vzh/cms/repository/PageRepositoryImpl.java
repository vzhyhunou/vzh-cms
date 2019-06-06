package vzh.cms.repository;

import vzh.cms.model.Page;

import javax.persistence.EntityManager;

/**
 * @author Viktar Zhyhunou
 */
public class PageRepositoryImpl extends ContentRepositoryImpl<Page, String> {

    public PageRepositoryImpl(EntityManager manager) {
        super(Page.class, manager);
    }
}
