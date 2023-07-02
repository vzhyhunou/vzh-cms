import React from 'react';
import {styled} from '@mui/material/styles';
import {AppBar, Toolbar, Typography, IconButton} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import {LocalesMenuButton} from 'react-admin';
import {Link} from 'react-router-dom';

import Login from './Login';

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
            <Login/>
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
