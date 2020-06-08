import React, {memo, useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {useLocale, useDataProvider} from 'react-admin';

import {GET_MENU_LOCALE} from '../admin/rest';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
}));

const Area = ({open, handleDrawerClose, items}) => {

    const classes = useStyles();

    return <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
            paper: classes.drawerPaper,
        }}
    >
        <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon/>
            </IconButton>
        </div>
        <Divider/>
        <List>
            {items.map(item =>
                <ListItem
                    key={item.id}
                    component="a"
                    href={item.id}
                >
                    <ListItemText
                        primary={item.title}
                    />
                </ListItem>
            )}
        </List>
    </Drawer>;
};

const EnhancedArea = memo(Area);

export default ({open, handleDrawerClose}) => {

    const locale = useLocale();
    const dataProvider = useDataProvider();
    const [items, setItems] = useState();

    useEffect(() => {

        dataProvider(GET_MENU_LOCALE, 'pages').then(response => setItems(response.data));
    }, [locale, dataProvider]);

    if (!items)
        return <div/>;

    return <EnhancedArea
        open={open}
        handleDrawerClose={handleDrawerClose}
        items={items}
    />;
};
