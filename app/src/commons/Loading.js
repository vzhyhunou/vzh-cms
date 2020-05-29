import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import {useTranslate} from './TranslationContext';

const useStyles = makeStyles(
    theme => ({
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            [theme.breakpoints.up('md')]: {
                height: '100%',
            },
            [theme.breakpoints.down('lg')]: {
                height: '100vh',
                marginTop: '-3em',
            },
        },
        icon: {
            width: '9em',
            height: '9em',
        },
        message: {
            textAlign: 'center',
            fontFamily: 'Roboto, sans-serif',
            opacity: 0.5,
            margin: '0 1em',
        },
    })
);

export default () => {

    const classes = useStyles();
    const translate = useTranslate();

    return <div className={classes.container}>
        <div className={classes.message}>
            <CircularProgress className={classes.icon} color="primary"/>
            <h1>{translate('ra.page.loading')}</h1>
            <div>{translate('ra.message.loading')}.</div>
        </div>
    </div>;
};
