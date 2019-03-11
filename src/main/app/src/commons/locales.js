const name = 'locale';

export let locales;
export let locale;
let imp;
let messages;

const load = value => imp(value).then(response => messages = response.default);

export const i18nLoader = (l, i) => {
    locales = l;
    imp = i;
    return load(locale = localStorage.getItem(name) || 'en').then(() => ({locale, messages}));
};

const i18nWriter = value => load(value).then(() => {
    localStorage.setItem(name, locale = value);
    return messages;
});

export const i18nProvider = value => value === locale ? messages : i18nWriter(value);
