import React, {useState} from 'react';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import {Outlet} from 'react-router-dom';

import Bar from './Bar';
import Menu from './Menu';

export default () => {

    const [open, setOpen] = useState(false);

    return <>
        <CssBaseline/>
        <Bar
            open={open}
            handleDrawerOpen={() => setOpen(true)}
        />
        <Menu
            open={open}
            handleDrawerClose={() => setOpen(false)}
        />
        <Toolbar/>
        <Container fixed component="main">
            <Outlet/>
        </Container>
    </>;
};