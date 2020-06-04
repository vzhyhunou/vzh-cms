import React, {
    createContext,
    useEffect,
    useState,
    useContext
} from 'react';

import {i18nLoader, i18nWriter} from './locale';

const TranslationContext = createContext();

export default ({locales, i18n, children}) => {

    const [contextValues, setContextValues] = useState();

    useEffect(() => {

        i18nLoader(i18n).then(props => setContextValues(props));
    }, [i18n]);

    if (!contextValues)
        return <div/>;

    let {locale, messages} = contextValues;

    const getLocale = () => locale;

    const getMessages = l => l && l !== locale ? i18nWriter(i18n, l).then(m => {
        locale = l;
        messages = m;
        return m;
    }) : messages;

    return <TranslationContext.Provider value={{
        locales,
        getLocale,
        getMessages
    }}>
        {children}
    </TranslationContext.Provider>;
};

export const useLocales = () => useContext(TranslationContext).locales;

export const useGetLocale = () => useContext(TranslationContext).getLocale;

export const useGetMessages = () => useContext(TranslationContext).getMessages;
