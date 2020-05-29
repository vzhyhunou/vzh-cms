import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {useSetLocale, Title, useTranslate, useLocale} from 'react-admin';
import {makeStyles} from '@material-ui/core/styles';

import {useLocales, useUpdateLocale} from '../commons/TranslationContext';

const useStyles = makeStyles({
    label: {
        width: '10em',
        display: 'inline-block'
    }
});

export default () => {

    const translate = useTranslate();
    const locales = useLocales();
    const locale = useLocale();
    const updateLocale = useUpdateLocale();
    const setLocale = useSetLocale();
    const classes = useStyles();
    const update = locale => updateLocale(locale).then(l => setLocale(l));

    return <Card>
        <Title title={'pos.configuration'}/>
        <CardContent>
            <div className={classes.label}>{translate('pos.language')}</div>
            <Select
                value={locale}
                onChange={e => update(e.target.value)}
            >
                {Object.keys(locales).map(l =>
                    <MenuItem key={l} value={l}>{locales[l]}</MenuItem>
                )}
            </Select>
        </CardContent>
    </Card>;
};
