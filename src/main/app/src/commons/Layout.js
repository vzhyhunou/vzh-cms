import React, {Component} from 'react';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {getLocale} from 'react-admin';
import compose from 'recompose/compose';

import Bar from './Bar';
import Menu from './Menu';

const drawerWidth = 240;

const styles = theme => ({
    appFrame: {
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },
});

class Layout extends Component {

    state = {
        open: false,
    };

    handleDrawerOpen = () => this.setState({open: true});

    handleDrawerClose = () => this.setState({open: false});

    render() {

        const {classes, Main, ...rest} = this.props;
        const {open} = this.state;

        return <div className={classes.appFrame}>
            <Bar
                open={open}
                handleDrawerOpen={this.handleDrawerOpen}
            />
            <div className={classNames(classes.content, classes.content, {
                [classes.contentShift]: open,
            })}>
                <Main {...rest}/>
            </div>
            <Menu
                open={open}
                handleDrawerClose={this.handleDrawerClose}
            />
        </div>;
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
)(Layout);
