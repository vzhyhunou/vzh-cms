import React from 'react';
import {Admin} from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import {useLocaleProvider, useFuncProvider} from '../commons';
import addUploadFeature from '../commons/upload';

export default ({children, locales, authProvider, dataProvider, ...rest}) => {

    const {useLocale, setLocale, useMessages, getMessages} = useLocaleProvider();
    const locale = useLocale();
    const messages = useMessages();
    const funcProvider = useFuncProvider();

    return locale && messages && <Admin
        dataProvider={addUploadFeature(dataProvider, funcProvider)}
        i18nProvider={polyglotI18nProvider(
            l => {
                if (l === locale) {
                    setLocale(l);
                    return messages;
                }
                return setLocale(l).then(getMessages);
            },
            locale,
            Object.entries(locales).map(([key, value]) => ({locale: key, name: value}))
        )}
        {...{authProvider, ...rest}}
    >
        {children}
    </Admin>;
};
