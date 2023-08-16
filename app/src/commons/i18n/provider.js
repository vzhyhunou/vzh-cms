const LOCALE = 'locale';

const setItem = value => localStorage.setItem(LOCALE, value);
const getItem = () => localStorage.getItem(LOCALE) || 'en';
const load = (i18n, locale) => i18n(locale).then(r => r.default);

export default i18n => ({
    setLocale: value => Promise.resolve(value).then(setItem),
    getLocale: () => Promise.resolve().then(getItem),
    getMessages: () => Promise.resolve().then(getItem).then(locale => load(i18n, locale))
});
