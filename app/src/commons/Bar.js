import React from 'react';
import classNames from 'classnames';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import EditIcon from '@material-ui/icons/Edit';
import {useLocale, usePermissions} from 'react-admin';

import LocaleInput from './LocaleInput';
import {useLocales} from './TranslationContext';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    },
    title: {
        flexGrow: 1,
    },
    hide: {
        display: 'none',
    },
}));

export default ({open, handleDrawerOpen}) => {

    const locales = useLocales();
    const locale = useLocale();
    const {permissions} = usePermissions();
    const classes = useStyles();

    return <AppBar
                position="fixed"
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
        <Toolbar>
            <IconButton
                color="inherit"
                href="/"
            >
                <HomeIcon/>
            </IconButton>
            <Typography
                variant="h6"
                className={classes.title}
            >
                Project
            </Typography>
            <LocaleInput/>
            {permissions
                ? permissions.includes('ROLE_EDITOR')
                    ? <IconButton
                        color="inherit"
                        href={`/pages/${window.location.pathname.split('/')[2]}/${Object.keys(locales).indexOf(locale) + 2}`}
                    >
                        <EditIcon/>
                    </IconButton>
                    : <IconButton
                        color="inherit"
                        href="/configuration"
                    >
                        <SettingsIcon/>
                    </IconButton>
                : <IconButton
                    color="inherit"
                    href="/login"
                >
                    <AccountCircleIcon/>
                </IconButton>
            }
            <IconButton
                color="inherit"
                onClick={handleDrawerOpen}
                className={classNames(open && classes.hide)}
            >
                <MenuIcon/>
            </IconButton>
        </Toolbar>
    </AppBar>;
};
