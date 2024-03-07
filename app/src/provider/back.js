import builder from './builder/back';

const getLocaleMessages = locale => import(`./messages/${locale}.js`).then(r => r.default);
const {
    getLocaleProvider,
    getFuncProvider,
    getAuthProvider,
    getDataProvider
} = builder;

export default props => {

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