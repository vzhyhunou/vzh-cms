package vzh.cms.repository;

import vzh.cms.model.Page;

import javax.persistence.EntityManager;

/**
 * @author Viktar Zhyhunou
 */
class PageRepositoryImpl extends RepositoryImpl<Page, String> {

    PageRepositoryImpl(EntityManager manager) {
        super(Page.class, manager);
    }
}
