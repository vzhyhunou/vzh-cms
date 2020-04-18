import React, {memo, useEffect, useState} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import compose from 'recompose/compose';

import dataProvider, {GET_MENU_LOCALE} from './rest';
import {withTranslation} from './TranslationContext';

const drawerWidth = 240;

const styles = theme => ({
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
});

const Area = ({classes, open, handleDrawerClose, items}) =>
    <Drawer
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
    </Drawer>
;

const EnhancedArea = compose(
    memo,
    withStyles(styles, {withTheme: true})
)(Area);

const Menu = ({open, handleDrawerClose, locale}) => {

    const [items, setItems] = useState();

    useEffect(() => {

        dataProvider()(GET_MENU_LOCALE, 'pages').then(response => setItems(response.data));
    }, [locale]);

    if (!items)
        return <div/>;

    return <EnhancedArea
        open={open}
        handleDrawerClose={handleDrawerClose}
        items={items}
    />;
};

export default withTranslation(Menu);
