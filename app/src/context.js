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
    providers: import(`./commons/providers/${REACT_APP_SRC}.js`),
    basename: REACT_APP_BASE
}))(process.env);
