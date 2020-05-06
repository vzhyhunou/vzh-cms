import React from 'react';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EditIcon from '@material-ui/icons/Edit';
import {withRouter} from 'react-router-dom';
import compose from 'recompose/compose';

import LocaleInput from './LocaleInput';
import WithPermissions from './WithPermissions';

const drawerWidth = 240;

const styles = theme => ({
    flex: {
        flex: 1
    },
    appBar: {
        position: 'absolute',
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
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
});

const Bar = ({classes, open, handleDrawerOpen, location}) =>
    <AppBar position="static"
            className={classNames(classes.appBar, {
                [classes.appBarShift]: open,
            })}>
        <Toolbar>
            <IconButton
                color="inherit"
                href="/"
            >
                <HomeIcon/>
            </IconButton>
            <Typography
                variant="h6"
                color="inherit"
                className={classes.flex}
            >
                Project
            </Typography>
            <LocaleInput/>
            <WithPermissions>
                {permissions => permissions
                    ? permissions.includes('ROLE_EDITOR')
                        ? <IconButton
                            color="inherit"
                            href={`/admin${location.pathname}`}
                        >
                            <EditIcon/>
                        </IconButton>
                        : <IconButton
                            color="inherit"
                            href="/admin"
                        >
                            <DashboardIcon/>
                        </IconButton>
                    : <IconButton
                        color="inherit"
                        href="/admin"
                    >
                        <AccountCircleIcon/>
                    </IconButton>
                }
            </WithPermissions>
            <IconButton
                color="inherit"
                onClick={handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
            >
                <MenuIcon/>
            </IconButton>
        </Toolbar>
    </AppBar>
;

export default compose(
    withRouter,
    withStyles(styles, {withTheme: true})
)(Bar);
