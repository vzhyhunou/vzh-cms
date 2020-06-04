import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {useSetLocale, Title, useTranslate, useLocale} from 'react-admin';
import {makeStyles} from '@material-ui/core/styles';

import {useLocales} from '../commons/TranslationContext';

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
    const setLocale = useSetLocale();
    const classes = useStyles();

    return <Card>
        <Title title={'pos.configuration'}/>
        <CardContent>
            <div className={classes.label}>{translate('pos.language')}</div>
            <Select
                value={locale}
                onChange={e => setLocale(e.target.value)}
            >
                {Object.keys(locales).map(l =>
                    <MenuItem key={l} value={l}>{locales[l]}</MenuItem>
                )}
            </Select>
        </CardContent>
    </Card>;
};
