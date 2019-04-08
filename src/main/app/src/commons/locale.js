const name = 'locale';

export let locale;
let imp;

const load = value => imp(value).then(response => response.default);

export const i18nLoader = i => {
    imp = i;
    return load(locale = localStorage.getItem(name) || 'en').then(messages => ({locale, messages}));
};

export const i18nWriter = value => load(value).then(messages => {
    localStorage.setItem(name, locale = value);
    return messages;
});
