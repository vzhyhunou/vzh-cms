const LOCALE = 'locale';

const load = (i18n, locale) => i18n(locale).then(response => response.default);

export const i18nLoader = i18n => {
    const locale = getLocale();
    return load(i18n, locale).then(messages => ({locale, messages}));
};

export const i18nWriter = (i18n, locale) => load(i18n, locale).then(messages => {
    localStorage.setItem(LOCALE, locale);
    return messages;
});

export const getLocale = () => localStorage.getItem(LOCALE) || 'en';
