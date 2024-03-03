import fakeDataProvider from 'ra-data-fakerest';

import getLocaleProvider from '../i18n/provider';
import getFuncProvider from '../functions';
import resources from '../resources';
import getAuthProvider from '../auth/provider/fake';
import getDataProvider from '../data/provider/fake';

export default props => {

    const localeProvider = getLocaleProvider({i18n: locale => import(`../i18n/messages/${locale}.js`), ...props});
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
