'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {changeLocale, translate, ViewTitle, getLocale} from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import compose from 'recompose/compose';
import LocaleSelect from '../commons/locale';

const styles = {
    label: {width: '10em', display: 'inline-block'}
};

const Configuration = ({classes, locale, changeLocale, translate}) =>
    <Card>
        <ViewTitle title={translate('pos.configuration')}/>
        <CardContent>
            <div className={classes.label}>{translate('pos.language')}</div>
            <LocaleSelect
                locale={locale}
                changeLocale={changeLocale}
            />
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
