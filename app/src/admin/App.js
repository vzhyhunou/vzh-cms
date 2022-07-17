import React from 'react';
import {Admin} from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import authProvider, {getToken} from './auth';
import {useGetLocale, useGetMessages} from '../commons';
import restProvider from './rest';
import addUploadFeature from '../commons/upload';

export default ({locales, children, history}) => {

    const getLocale = useGetLocale();
    const getMessages = useGetMessages();
    const l = Object.entries(locales).map(([key, value]) => ({locale: key, name: value}));

    return <Admin
        {...{authProvider, history}}
        dataProvider={addUploadFeature(restProvider(getLocale, getToken))}
        i18nProvider={{...polyglotI18nProvider(getMessages, getLocale()), getLocales: () => l}}
    >
        {children}
    </Admin>;
};
