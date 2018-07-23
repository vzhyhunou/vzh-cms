'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {changeLocale, translate, ViewTitle, getLocale} from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import compose from 'recompose/compose';
import LOCALES from '../commons/locales';

const styles = {
    label: {
        width: '10em',
        display: 'inline-block'
    }
};

const Configuration = ({classes, locale, changeLocale, translate}) =>
    <Card>
        <ViewTitle title={translate('pos.configuration')}/>
        <CardContent>
            <div className={classes.label}>{translate('pos.language')}</div>
            <Select
                value={locale}
                onChange={(e) => changeLocale(e.target.value)}
            >
                {Object.keys(LOCALES).map(l =>
                    <MenuItem key={l} value={l}>{LOCALES[l]}</MenuItem>
                )}
            </Select>
        </CardContent>
    </Card>
;

export default compose(
    connect(
        state => ({
            locale: getLocale(state)
        }),
        {changeLocale}
    ),
    translate,
    withStyles(styles)
)(Configuration);