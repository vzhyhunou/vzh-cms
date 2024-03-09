import React from 'react';
import {styled} from '@mui/material/styles';
import {Drawer, List, ListItem, ListItemText, Divider, IconButton} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {Link} from 'react-router-dom';

import {useExchange} from '..';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start'
}));

export default ({open, handleDrawerClose}) => {

    const {data} = useExchange({path: 'pages/search/menu'});

    if (!data) {
        return null;
    }

    return <Drawer
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth
            }
        }}
        variant="persistent"
        anchor="right"
        open={open}
    >
        <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon/>
            </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            {data.map(({id, title}) =>
                <ListItem
                    key={id}
                    component={Link}
                    to={`pages/${id}`}
                >
                    <ListItemText
                        primary={title}
                    />
                </ListItem>
            )}
        </List>
    </Drawer>;
};
