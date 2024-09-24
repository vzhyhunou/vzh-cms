import React from 'react';
import { Admin } from 'react-admin';

import { useContextProvider } from '..';
import useLocale from './context/i18n/useLocale';
import useMessages from './context/i18n/useMessages';
import getI18nProvider from './provider/i18n';
import addUploadFeature from './provider/data/upload';

export default ({children, ...rest}) => {

    const contextProvider = useContextProvider();
    const locale = useLocale();
    const messages = useMessages();

    return locale && messages && <Admin
        dataProvider={addUploadFeature(contextProvider)}
        i18nProvider={getI18nProvider({...contextProvider, locale, messages})}
        authProvider={contextProvider.authProvider}
        {...rest}
    >
        {children}
    </Admin>;
};