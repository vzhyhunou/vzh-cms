import fakeDataProvider from 'ra-data-fakerest';

import getLocaleProvider from './i18n';
import getFuncProvider from './func/fake';
import getAuthProvider from './auth/fake';
import getDataProvider from './data/fake';

export default {
    getLocaleProvider,
    getFuncProvider,
    getAuthProvider,
    getDataProvider,
    getFakeDataProvider: resources =>
        fakeDataProvider(Object.fromEntries(Object.entries(resources).map(([k, v]) => [k, v.map(({item}) => item)])), true)
};