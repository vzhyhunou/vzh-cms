import React, {createContext, useEffect, useState} from 'react';
import Polyglot from 'node-polyglot';

import {i18nLoader, i18nWriter} from './locale';

const TranslationContext = createContext();

export default ({locales, i18n, children}) => {

    const [contextValues, setContextValues] = useState();

    const update = (locale, messages) => {

        const polyglot = new Polyglot({
            locale,
            phrases: messages
        });
        setContextValues({
            locale,
            messages,
            translate: polyglot.t.bind(polyglot),
            locales
        });
    };

    useEffect(() => {

        i18nLoader(i18n).then(({locale, messages}) => update(locale, messages));
    }, []);

    const updateLocale = locale => i18nWriter(i18n, locale).then(messages => update(locale, messages));

    const getLocale = () => contextValues.locale;

    const getMessages = locale => i18nWriter(i18n, locale);

    if (!contextValues)
        return <div/>;

    return <TranslationContext.Provider value={{
        ...contextValues,
        updateLocale: updateLocale,
        getLocale: getLocale,
        getMessages: getMessages
    }}>
        {children}
    </TranslationContext.Provider>;
};

export const withTranslation = Component => props =>
    <TranslationContext.Consumer>
        {({updateLocale, getLocale, getMessages, ...state}) => <Component {...props} {...state}/>}
    </TranslationContext.Consumer>
;

export const withTranslationUpdate = Component => props =>
    <TranslationContext.Consumer>
        {state => <Component {...props} {...state}/>}
    </TranslationContext.Consumer>
;
