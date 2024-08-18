import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import {LocalesMenuButton} from 'react-admin';
import {Link} from 'react-router-dom';

import Login from './Login';

export default ({open, handleDrawerOpen}) =>
    <AppBar>
        <Toolbar>
            <IconButton
                color="inherit"
                component={Link}
                to="/"
            >
                <HomeIcon/>
            </IconButton>
            <Box sx={{ flexGrow: 1 }}/>
            <LocalesMenuButton/>
            <Login/>
            <IconButton
                color="inherit"
                onClick={handleDrawerOpen}
            >
                <MenuIcon/>
            </IconButton>
        </Toolbar>
    </AppBar>
;
