import React, {createContext, useEffect, useRef, useState} from 'react';
import Polyglot from 'node-polyglot';

import {i18nLoader, i18nWriter} from './locale';

const TranslationContext = createContext();

export default ({locales, i18n, children}) => {

    const [contextValues, setContextValues] = useState();
    const contextValuesRef = useRef();

    const update = (locale, messages) => {

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
    };

    useEffect(() => {

        i18nLoader(i18n).then(({locale, messages}) => update(locale, messages));
    }, []);

    const updateLocale = locale => i18nWriter(i18n, locale).then(messages => {
        update(locale, messages);
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

export const withSanitizedTranslation = Component => props =>
    <TranslationContext.Consumer>
        {({updateLocale, getMessages, ...state}) => <Component {...props} {...state}/>}
    </TranslationContext.Consumer>
;

export const withTranslation = Component => props =>
    <TranslationContext.Consumer>
        {state => <Component {...props} {...state}/>}
    </TranslationContext.Consumer>
;