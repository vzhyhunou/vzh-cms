'use strict';

import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import locales from './locales';

export default class extends Component {

    state = {anchorEl: null};

    shouldComponentUpdate(nextProps) {

        const {locale} = this.props;

        if (locale === nextProps.locale)
            return true;
        this.handleClose();
        return false;
    }

    handleClick = e => this.setState({anchorEl: e.currentTarget});

    handleClose = () => this.setState({anchorEl: null});

    render() {

        const {anchorEl} = this.state;
        const {locale, changeLocale} = this.props;

        return <div>
            <Button
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
                color="inherit"
            >
                {locale}
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
            >
                {Object.keys(locales).filter(l => l !== locale).map(l =>
                    <MenuItem key={l} onClick={() => changeLocale(l)}>{locales[l]}</MenuItem>
                )}
            </Menu>
        </div>;
    }
}
