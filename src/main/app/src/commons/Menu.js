import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {connect} from 'react-redux';
import {getLocale} from 'react-admin';
import compose from 'recompose/compose';

import dataProvider, {GET_MENU_LOCALE} from './rest';

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

class Menu extends Component {

    dataProvider = dataProvider();

    loadData = () => {
        this.dataProvider(GET_MENU_LOCALE, 'pages').then(response => {
            this.setState({items: response.data});
        })
    };

    shouldComponentUpdate(nextProps) {

        const {locale} = this.props;

        if (locale === nextProps.locale)
            return true;
        this.loadData();
        return false;
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        if (!this.state)
            return <div/>;

        const {classes, open, handleDrawerClose, locale} = this.props;
        const {items} = this.state;

        return <Drawer
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
                            primary={item.properties[locale].title}
                        />
                    </ListItem>
                )}
            </List>
        </Drawer>;
    }
}

export default compose(
    connect(
        state => ({
            locale: getLocale(state)
        }),
        {}
    ),
    withStyles(styles, {withTheme: true})
)(Menu);
