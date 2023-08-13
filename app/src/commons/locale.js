import {useState, useEffect} from 'react';

const LOCALE = 'locale';

const setItem = value => localStorage.setItem(LOCALE, value);
const getItem = () => localStorage.getItem(LOCALE) || 'en';
const load = (i18n, locale) => i18n(locale).then(r => r.default);

export default i18n => {

    const getLocale = () => Promise.resolve().then(getItem);
    const getMessages = () => Promise.resolve().then(getItem).then(locale => load(i18n, locale));

    return {
        setLocale: value => Promise.resolve(value).then(setItem),
        getLocale,
        getMessages,
        useLocale: () => {
            const [value, setValue] = useState();
            useEffect(() => {
                getLocale().then(setValue);
            }, []);
            return value;
        },
        useMessages: () => {
            const [value, setValue] = useState();
            useEffect(() => {
                getMessages().then(setValue);
            }, []);
            return value;
        }
    };
};
