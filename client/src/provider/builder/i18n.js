const LOCALE = 'locale';

export default ({getLocaleMessages, locales}) => {

    const setItem = value => localStorage.setItem(LOCALE, value);
    const getItem = () => localStorage.getItem(LOCALE) || Object.keys(locales)[0];

    return {
        setLocale: value => Promise.resolve(value).then(setItem),
        getLocale: () => Promise.resolve().then(getItem),
        getMessages: () => Promise.resolve().then(getItem).then(getLocaleMessages)
    };
};
