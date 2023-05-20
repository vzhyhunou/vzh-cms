import React from 'react';
import {Admin} from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import authProvider from './auth';
import {useLocaleProvider, useLocales, useDataProvider} from '../commons';
import restProvider from './rest';
import addUploadFeature from '../commons/upload';

export default ({children, ...rest}) => {

    const {getLocale, getMessages} = useLocaleProvider();
    const locales = useLocales();
    const {data, dataRestProvider, dataAuthProvider, getResponse} = useDataProvider();

    return <Admin
        authProvider={data ? dataAuthProvider(data) : authProvider}
        dataProvider={addUploadFeature(data ? dataRestProvider(data, getResponse(getLocale)) : restProvider(getLocale, authProvider.getToken))}
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
