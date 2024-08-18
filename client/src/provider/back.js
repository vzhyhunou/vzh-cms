import builder from './builder/back';

export default props => {

    const {
        getLocaleProvider,
        getFuncProvider,
        getAuthProvider,
        getDataProvider
    } = builder;
    const getLocaleMessages = locale => import(`./messages/${locale}.js`).then(r => r.default);
    const localeProvider = getLocaleProvider({getLocaleMessages, ...props});
    const funcProvider = getFuncProvider(props);
    const authProvider = getAuthProvider(props);
    const dataProvider = getDataProvider({localeProvider, authProvider, ...props});

    return {
        localeProvider,
        funcProvider,
        authProvider,
        dataProvider
    };
};