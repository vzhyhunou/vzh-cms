import React from 'react';
import {Admin} from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import {useContextProvider} from '../commons/AppContext';
import useLocale from '../commons/i18n/useLocale';
import useMessages from '../commons/i18n/useMessages';
import addUploadFeature from '../commons/data/upload';

export default ({children, ...rest}) => {

    const {locales, localeProvider: {setLocale, getMessages}, funcProvider, authProvider, dataProvider} = useContextProvider();
    const locale = useLocale();
    const messages = useMessages();

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
