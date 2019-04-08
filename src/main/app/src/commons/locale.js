const name = 'locale';

const load = (i18n, locale) => i18n(locale).then(response => response.default);

export const i18nLoader = i18n => {
    const locale = localStorage.getItem(name) || 'en';
    return load(i18n, locale).then(messages => ({locale, messages}));
};

export const i18nWriter = (i18n, locale) => load(i18n, locale).then(messages => {
    localStorage.setItem(name, locale);
    return messages;
});
