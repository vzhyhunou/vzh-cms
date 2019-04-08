const name = 'locale';

let imp;

const load = locale => imp(locale).then(response => response.default);

export const i18nLoader = i => {
    imp = i;
    const locale = localStorage.getItem(name) || 'en';
    return load(locale).then(messages => ({locale, messages}));
};

export const i18nWriter = locale => load(locale).then(messages => {
    localStorage.setItem(name, locale);
    return messages;
});
