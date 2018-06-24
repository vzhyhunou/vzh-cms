'use strict';

import React, {Component} from 'react';
import cookie from 'react-cookies';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const locales = {
    "en": "English",
    "ru": "Русский"
};

const name = 'locale';

var locale;
var messages;

const load = (value, callback) => {
    return import(`./i18n/${value}`).then(response => {
        messages = response.default;
        callback();
        return messages;
    });
};

export const i18nLoader = callback => {
    locale = cookie.load(name) || 'en';
    load(locale, () => callback({locale, messages}));
};

export const i18nProvider = value => {
    return value === locale ? messages : load(value, () => {
        cookie.save(name, value, {path: '/'});
        locale = value;
    });
};

export const i18nLocale = () => locale;

export default ({locale, changeLocale}) =>
    <Select
        value={locale}
        onChange={(e) => changeLocale(e.target.value)}
    >
        {Object.keys(locales).map(l =>
            <MenuItem key={l} value={l}>{locales[l]}</MenuItem>
        )}
    </Select>
;
