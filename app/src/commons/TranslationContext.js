import React, {
    createContext,
    useEffect,
    useRef,
    useState,
    useContext,
    useCallback
} from 'react';
import Polyglot from 'node-polyglot';

import {i18nLoader, i18nWriter} from './locale';

const TranslationContext = createContext();

export default ({locales, i18n, children}) => {

    const [contextValues, setContextValues] = useState();
    const contextValuesRef = useRef();

    useEffect(() => {

        i18nLoader(i18n).then(({locale, messages}) => {

            const polyglot = new Polyglot({
                    locale,
                    phrases: messages
            });
            contextValuesRef.current = {
                locale,
                messages,
                translate: polyglot.t.bind(polyglot),
                locales
            };
            setContextValues(contextValuesRef.current);
        });
    }, [i18n, locales]);

    const updateLocale = locale => i18nWriter(i18n, locale).then(messages => {

        const polyglot = new Polyglot({
            locale,
            phrases: messages
        });
        contextValuesRef.current = {
            locale,
            messages,
            translate: polyglot.t.bind(polyglot),
            locales
        };
        setContextValues(contextValuesRef.current);
        return locale;
    });

    const getMessages = () => contextValuesRef.current.messages;

    if (!contextValues)
        return <div/>;

    return <TranslationContext.Provider value={{
        ...contextValues,
        updateLocale,
        getMessages
    }}>
        {children}
    </TranslationContext.Provider>;
};

export const useTranslate = () => {
    const { translate } = useContext(TranslationContext);
    return useCallback(
        (key, options) => translate(key, options),
        [translate]
    );
};

export const useLocales = () => {
    return useContext(TranslationContext).locales;
};

export const useLocale = () => {
    return useContext(TranslationContext).locale;
};

export const useUpdateLocale = () => {
    const { updateLocale } = useContext(TranslationContext);
    return useCallback(
        locale => updateLocale(locale),
        [updateLocale]
    );
};

export const useMessages = () => {
    return useContext(TranslationContext).messages;
};

export const useGetMessages = () => {
    const { getMessages } = useContext(TranslationContext);
    return useCallback(
        () => getMessages(),
        [getMessages]
    );
};
