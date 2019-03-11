const LOCALE = 'locale';

export let locales;
export let locale;

let messages;

const load = value => import(`./i18n/${value}`).then(response => messages = response.default);

export const i18nLoader = (p = locales) => {
    locales = p;
    return load(locale = localStorage.getItem(LOCALE) || 'en').then(() => ({locale, messages}));
};

const i18nWriter = value => load(value).then(() => {
    localStorage.setItem(LOCALE, locale = value);
    return messages;
});

export const i18nProvider = value => value === locale ? messages : i18nWriter(value);
