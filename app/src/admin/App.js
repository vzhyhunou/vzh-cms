import React from 'react';
import {Admin} from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import authProvider from './auth';
import fakeAuthProvider from './fake/auth';
import {useGetLocale, useGetMessages, useData} from '../commons';
import restProvider from './rest';
import fakeRestProvider from './fake/rest';
import addUploadFeature from '../commons/upload';

export default ({locales, children, ...rest}) => {

    const getLocale = useGetLocale();
    const getMessages = useGetMessages();
    const data = useData();
    const l = Object.entries(locales).map(([key, value]) => ({locale: key, name: value}));

    return <Admin
        authProvider={data ? fakeAuthProvider(data) : authProvider}
        dataProvider={addUploadFeature(data ? fakeRestProvider(getLocale, data) : restProvider(getLocale, authProvider.getToken))}
        i18nProvider={{...polyglotI18nProvider(getMessages, getLocale()), getLocales: () => l}}
        {...rest}
    >
        {children}
    </Admin>;
};
