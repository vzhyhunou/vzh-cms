import {PageComponent} from './pages';

export default {
    roles: {
        ADMIN: 'ADMIN',
        MANAGER: 'MANAGER',
        PAGES_EDITOR: 'PAGES_EDITOR'
    },
    locales: {
        en: 'English',
        ru: 'Русский'
    },
    components: {
        Page: PageComponent
    },
    i18n: locale => import(`./commons/i18n/${locale}`),
    resources: import(`./commons/resources/${process.env.REACT_APP_SRC}`),
    data: import(`./commons/data/${process.env.REACT_APP_SRC}`),
    auth: import(`./commons/auth/${process.env.REACT_APP_SRC}`),
    functions: import(`./commons/functions`),
    basename: process.env.REACT_APP_BASE
};
