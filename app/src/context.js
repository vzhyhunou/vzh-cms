import Page from './pages/Component';

export default (({REACT_APP_SRC, REACT_APP_BASE}) => ({
    locales: {
        en: 'English',
        ru: 'Русский'
    },
    tags: {
        pages: {
            MENU: 'MENU',
            PUBLISHED: 'PUBLISHED'
        },
        users: {
            ADMIN: 'ADMIN',
            MANAGER: 'MANAGER',
            PAGES_EDITOR: 'PAGES_EDITOR'
        }
    },
    components: {
        Page
    },
    i18n: locale => import(`./commons/i18n/messages/${locale}.js`),
    resources: import(`./commons/resources/${REACT_APP_SRC}.js`),
    data: import(`./commons/data/provider/${REACT_APP_SRC}.js`),
    auth: import(`./commons/auth/provider/${REACT_APP_SRC}.js`),
    functions: import('./commons/functions.js'),
    basename: REACT_APP_BASE
}))(process.env);
