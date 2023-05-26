import React from 'react';
import {Admin} from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import {useLocaleProvider, useLocales, useDataProvider, useAuthProvider} from '../commons';
import addUploadFeature from '../commons/upload';

export default ({children, ...rest}) => {

    const {getLocale, getMessages} = useLocaleProvider();
    const locales = useLocales();
    const data = useDataProvider();
    const auth = useAuthProvider();

    return <Admin
        authProvider={auth}
        dataProvider={addUploadFeature(data(getLocale, auth.getToken))}
        i18nProvider={polyglotI18nProvider(
            getMessages,
            getLocale(),
            Object.entries(locales).map(([key, value]) => ({locale: key, name: value}))
        )}
        {...rest}
    >
        {children}
    </Admin>;
};
