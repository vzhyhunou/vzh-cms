import polyglotI18nProvider from 'ra-i18n-polyglot';

export default ({locales, localeProvider: {setLocale, getMessages}, locale, messages}) => {

    const getTranslation = value => {
        if (value === locale) {
            setLocale(value);
            return messages;
        }
        return setLocale(value).then(getMessages);
    };

    return polyglotI18nProvider(
        getTranslation,
        locale,
        Object.entries(locales).map(([key, value]) => ({locale: key, name: value}))
    );
};
