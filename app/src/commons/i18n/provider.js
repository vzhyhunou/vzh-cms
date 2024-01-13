const LOCALE = 'locale';

const setItem = value => localStorage.setItem(LOCALE, value);
const getItem = locales => localStorage.getItem(LOCALE) || Object.keys(locales)[0];
const load = (i18n, locale) => i18n(locale).then(r => r.default);

export default (i18n, locales) => ({
    setLocale: value => Promise.resolve(value).then(setItem),
    getLocale: () => Promise.resolve().then(() => getItem(locales)),
    getMessages: () => Promise.resolve().then(() => getItem(locales)).then(locale => load(i18n, locale))
});
