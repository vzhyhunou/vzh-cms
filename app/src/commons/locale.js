const LOCALE = 'locale';

const load = (i18n, locale) => i18n(locale).then(r => r.default);

export default i18n => {

    let locale = localStorage.getItem(LOCALE) || 'en', messages;

    return load(i18n, locale).then(m => {
        messages = m;
        return {
            getLocale: () => locale,
            getMessages: l => !l || l === locale ? messages : load(i18n, l).then(m => {
                localStorage.setItem(LOCALE, l);
                locale = l;
                messages = m;
                return m;
            })
        };
    });
};
