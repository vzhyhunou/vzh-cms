package vzh.cms.repository;

import vzh.cms.consumer.FilesContentConsumer;
import vzh.cms.model.Page;

import javax.persistence.EntityManager;

/**
 * @author Viktar Zhyhunou
 */
public class PageRepositoryImpl extends ContentRepositoryImpl<Page, String> {

    public PageRepositoryImpl(EntityManager manager, FilesContentConsumer<Page> filesContentConsumer) {
        super(Page.class, manager, filesContentConsumer);
    }
}
