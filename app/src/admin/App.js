import React from 'react';
import {Admin} from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import {useLocaleProvider, useFuncProvider} from '../commons';
import addUploadFeature from '../commons/upload';

export default ({children, locales, authProvider, dataProvider, ...rest}) => {

    const {getLocale, getMessages} = useLocaleProvider();
    const funcProvider = useFuncProvider();

    return <Admin
        dataProvider={addUploadFeature(dataProvider, funcProvider)}
        i18nProvider={polyglotI18nProvider(
            getMessages,
            getLocale(),
            Object.entries(locales).map(([key, value]) => ({locale: key, name: value}))
        )}
        {...{authProvider, ...rest}}
    >
        {children}
    </Admin>;
};
