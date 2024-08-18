import builder from './builder/fake';
import resources from './resources';

export default props => {

    const {
        getLocaleProvider,
        getFuncProvider,
        getAuthProvider,
        getDataProvider,
        getFakeDataProvider
    } = builder;
    const getLocaleMessages = locale => import(`./messages/${locale}.js`).then(r => r.default);
    const localeProvider = getLocaleProvider({getLocaleMessages, ...props});
    const funcProvider = getFuncProvider(props);
    const provider = getFakeDataProvider(resources);
    const authProvider = getAuthProvider({provider, ...props});
    const dataProvider = getDataProvider({provider, localeProvider, authProvider, ...props});

    return {
        localeProvider,
        funcProvider,
        authProvider,
        dataProvider
    };
};