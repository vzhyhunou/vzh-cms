export default {
    "en": "English",
    "ru": "Русский"
};

const LOCALE = 'locale';

var locale;
var messages;

const load = value => import(`./i18n/${value}`).then(response => messages = response.default);

export const i18nLoader = () => load(locale = localStorage.getItem(LOCALE) || 'en').then(() => ({locale, messages}));

const i18nWriter = value => load(value).then(() => {
    localStorage.setItem(LOCALE, locale = value);
    return messages;
});

export const i18nProvider = value => value === locale ? messages : i18nWriter(value);

export const i18nLocale = () => locale;
