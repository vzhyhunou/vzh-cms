import React from 'react';
import {styled} from '@mui/material/styles';
import {AppBar, Toolbar, Typography, IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import {usePermissions, LocalesMenuButton} from 'react-admin';
import {Link, useParams} from 'react-router-dom';

import {useRoles} from './AppContext';

const drawerWidth = 240;

const Root = styled(AppBar, {shouldForwardProp: prop => prop !== 'open'})(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginRight: drawerWidth
    })
}));

const AdminButton = () => {

    const {permissions} = usePermissions();
    const {id} = useParams();
    const {EDITOR, MANAGER} = useRoles();

    if (!permissions) {
        return <IconButton
            color="inherit"
            component={Link}
            to="/login"
        >
            <AccountCircleIcon/>
        </IconButton>;
    }

    if (permissions.includes(EDITOR)) {
        return <IconButton
            color="inherit"
            component={Link}
            to={`/pages/${id}`}
        >
            <EditIcon/>
        </IconButton>;
    }

    if (permissions.includes(MANAGER)) {
        return <IconButton
            color="inherit"
            component={Link}
            to="/users"
        >
            <SettingsIcon/>
        </IconButton>;
    }

    return null;
};

export default ({open, handleDrawerOpen}) =>
    <Root
        position="fixed"
        open={open}
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
                sx={{flexGrow: 1}}
            >
                Project
            </Typography>
            <LocalesMenuButton/>
            <AdminButton/>
            <IconButton
                color="inherit"
                onClick={handleDrawerOpen}
                sx={{...(open && {display: 'none'})}}
            >
                <MenuIcon/>
            </IconButton>
        </Toolbar>
    </Root>
;
