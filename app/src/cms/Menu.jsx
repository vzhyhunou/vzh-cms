import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {Link} from 'react-router-dom';

import {useExchange} from '..';

export default ({open, handleDrawerClose}) => {

    const {data} = useExchange({path: 'pages/search/menu'});

    if (!data) {
        return null;
    }

    return <Drawer
        sx={{ '& .MuiDrawer-paper': { width: 240 } }}
        anchor="right"
        open={open}
        onClose={handleDrawerClose}
    >
        <Toolbar>
            <IconButton onClick={handleDrawerClose}>
                <ChevronRightIcon/>
            </IconButton>
        </Toolbar>
        <Divider />
        <Box onClick={handleDrawerClose}>
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
        </Box>
    </Drawer>;
};
