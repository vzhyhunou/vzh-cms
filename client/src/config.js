import { PageComponent } from '.';

export default {
    locales: {
        en: 'English',
        ru: 'Русский'
    },
    resources: {
        pages: {
            tags: {
                MENU: 'MENU',
                PUBLISHED: 'PUBLISHED'
            }
        },
        users: {
            tags: {
                ADMIN: 'ADMIN',
                MANAGER: 'MANAGER',
                PAGES_EDITOR: 'PAGES_EDITOR'
            }
        }
    },
    components: {
        Page: PageComponent
    },
    provider: import(`./provider/${process.env.REACT_APP_SRC}.js`),
    basename: process.env.REACT_APP_BASE
};