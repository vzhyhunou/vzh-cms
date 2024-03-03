import getLocaleProvider from '../i18n/provider';
import getFuncProvider from '../functions';
import getAuthProvider from '../auth/provider/back';
import getDataProvider from '../data/provider/back';

export default props => {

    const localeProvider = getLocaleProvider({i18n: locale => import(`../i18n/messages/${locale}.js`), ...props});
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
