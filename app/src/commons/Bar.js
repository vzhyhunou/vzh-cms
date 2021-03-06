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
import {Link} from 'react-router-dom';

import LocaleInput from './LocaleInput';
import {useLocales} from './AppContext';
import {EDITOR} from './roles';

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
                component={Link}
                to="/"
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
                ? permissions.includes(EDITOR)
                    ? <IconButton
                        color="inherit"
                        component={Link}
                        to={`/pages/${window.location.pathname.split('/')[3]}/${Object.keys(locales).indexOf(locale) + 2}`}
                    >
                        <EditIcon/>
                    </IconButton>
                    : <IconButton
                        color="inherit"
                        component={Link}
                        to="/configuration"
                    >
                        <SettingsIcon/>
                    </IconButton>
                : <IconButton
                    color="inherit"
                    component={Link}
                    to="/login"
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
