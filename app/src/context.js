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
    data: name => import(`./commons/rest/${name}`),
    auth: name => import(`./commons/auth/${name}`)
};
