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
    let dataProvider = getFakeDataProvider(resources);
    const authProvider = getAuthProvider({dataProvider, ...props});
    dataProvider = getDataProvider({dataProvider, localeProvider, authProvider, ...props});

    return {
        localeProvider,
        funcProvider,
        authProvider,
        dataProvider
    };
};