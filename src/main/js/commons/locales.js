import React, {Component} from 'react';
import cookie from 'react-cookies';

export default {
    "en": "English",
    "ru": "Русский"
};

const NAME = 'locale';

var locale;
var messages;

const load = value => import(`./i18n/${value}`).then(response => messages = response.default);

export const i18nLoader = () => load(locale = cookie.load(NAME) || 'en').then(() => ({locale, messages}));

const i18nWriter = value => load(value).then(() => {
    cookie.save(NAME, locale = value, {path: '/'});
    return messages;
});

export const i18nUpdater = value => value === locale ? new Promise(resolve => resolve(messages)) : i18nWriter(value);

export const i18nProvider = value => value === locale ? messages : i18nWriter(value);

export const i18nLocale = () => locale;
