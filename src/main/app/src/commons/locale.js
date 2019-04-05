const name = 'locale';

export let locale;
let imp;
let messages;

const load = value => imp(value).then(response => messages = response.default);

export const i18nLoader = i => {
    imp = i;
    return load(locale = localStorage.getItem(name) || 'en').then(() => ({locale, messages}));
};

export const i18nWriter = value => load(value).then(() => {
    localStorage.setItem(name, locale = value);
    return messages;
});

export const i18nProvider = value => value === locale ? messages : i18nWriter(value);
