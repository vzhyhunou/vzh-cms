import fakeDataProvider from 'ra-data-fakerest';
import builder from './builder/fake';
import resources from './resources';

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
    const provider = fakeDataProvider(resources, true);
    const authProvider = getAuthProvider({provider, ...props});
    const dataProvider = getDataProvider({provider, localeProvider, authProvider, ...props});

    return {
        localeProvider,
        funcProvider,
        authProvider,
        dataProvider
    };
};