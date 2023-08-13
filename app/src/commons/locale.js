const LOCALE = 'locale';

const setLocale = value => localStorage.setItem(LOCALE, value);
const getLocale = () => localStorage.getItem(LOCALE) || 'en';
const load = (i18n, locale) => i18n(locale).then(r => r.default);

export default i18n => {

    let locale = getLocale(), messages;

    return load(i18n, locale).then(m => {
        messages = m;
        return {
            getLocale: () => locale,
            getMessages: l => !l || l === locale ? messages : load(i18n, l).then(m => {
                setLocale(l);
                locale = l;
                messages = m;
                return m;
            })
        };
    });
};
