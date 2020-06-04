import React, {
    createContext,
    useEffect,
    useState,
    useContext
} from 'react';

import {i18nLoader, i18nWriter} from './locale';
import rest from './rest';

const AppContext = createContext();

export default ({locales, i18n, children}) => {

    const [contextValues, setContextValues] = useState();

    useEffect(() => {

        i18nLoader(i18n).then(props => setContextValues(props));
    }, [i18n]);

    if (!contextValues)
        return <div/>;

    let {locale, messages} = contextValues;

    const getMessages = l => l && l !== locale ? i18nWriter(i18n, l).then(m => {
        locale = l;
        messages = m;
        return m;
    }) : messages;

    const dataProvider = rest(() => locale);

    return <AppContext.Provider value={{
        locales,
        locale,
        getMessages,
        dataProvider
    }}>
        {children}
    </AppContext.Provider>;
};

export const useLocales = () => useContext(AppContext).locales;
export const useLocale = () => useContext(AppContext).locale;
export const useGetMessages = () => useContext(AppContext).getMessages;
export const useDataProvider = () => useContext(AppContext).dataProvider;
