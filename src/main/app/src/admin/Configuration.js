import React from 'react';
import {connect} from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {changeLocale, Title} from 'react-admin';
import withStyles from '@material-ui/core/styles/withStyles';
import compose from 'recompose/compose';

import {withTranslationFull} from '../commons/TranslationContext';

const styles = {
    label: {
        width: '10em',
        display: 'inline-block'
    }
};

const Configuration = ({changeLocale, updateLocale, classes, locale, translate, locales}) => {

    const update = locale => updateLocale(locale).then(l => changeLocale(l));

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

export default compose(
    connect(
        undefined,
        {changeLocale}
    ),
    withTranslationFull,
    withStyles(styles)
)(Configuration);
