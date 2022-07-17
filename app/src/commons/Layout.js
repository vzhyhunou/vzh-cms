import React, {useState} from 'react';
import {Box, GlobalStyles} from '@mui/material';
import {styled} from '@mui/material/styles';

import Body from './Body';
import Bar from './Bar';
import Menu from './Menu';

const drawerWidth = 240;

const Main = styled('main', {shouldForwardProp: prop => prop !== 'open' })(({theme, open}) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: -drawerWidth,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginRight: 0
    })
}));

export default () => {

    const [open, setOpen] = useState(false);

    return <>
        <GlobalStyles styles={{'.starter': {
            padding: '3rem 1.5rem',
            textAlign: 'center'
        }}}/>
        <Box sx={{display: 'flex'}}>
            <Bar
                open={open}
                handleDrawerOpen={() => setOpen(true)}
            />
            <Main open={open}>
                <Body/>
            </Main>
            <Menu
                open={open}
                handleDrawerClose={() => setOpen(false)}
            />
        </Box>
    </>;
};
