import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {useLocale, useQuery} from 'react-admin';
import {Link} from 'react-router-dom';

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

export default ({open, handleDrawerClose}) => {

    const locale = useLocale();
    const classes = useStyles();
    const {data} = useQuery({
        type: 'exchange',
        payload: {path: 'pages/search/menu', options: {locale}}
    });

    if (!data) {
        return null;
    }

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
            {data.map(item =>
                <ListItem
                    key={item.id}
                    component={Link}
                    to={item.id}
                >
                    <ListItemText
                        primary={item.title}
                    />
                </ListItem>
            )}
        </List>
    </Drawer>;
};
