import React, {Component} from 'react';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';

import {i18nUpdater} from './locales';
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

    constructor({locale, messages}) {
        super();
        this.state = {
            open: false,
            locale,
            messages
        };
        this.path = window.location.pathname.split('/').slice(1);
    }

    changeLocale = locale => i18nUpdater(locale).then(messages => this.setState({locale, messages}));

    handleDrawerOpen = () => this.setState({open: true});

    handleDrawerClose = () => this.setState({open: false});

    render() {

        const {classes, Main} = this.props;
        const {open} = this.state;

        return <div className={classes.appFrame}>
            <Bar
                {...this.state}
                changeLocale={this.changeLocale}
                path={this.path}
                handleDrawerOpen={this.handleDrawerOpen}
            />
            <div className={classNames(classes.content, classes.content, {
                [classes.contentShift]: open,
            })}>
                <Main
                    {...this.state}
                    path={this.path.slice(1)}
                />
            </div>
            <Menu
                {...this.state}
                handleDrawerClose={this.handleDrawerClose}
            />
        </div>;
    }
}

export default withStyles(styles, {withTheme: true})(Layout);
