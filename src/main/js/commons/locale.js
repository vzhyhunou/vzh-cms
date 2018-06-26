'use strict';

import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import LOCALES from './locales';

export default class extends Component {

    state = {anchorEl: null};

    handleClick = e => this.setState({anchorEl: e.currentTarget});

    handleClose = () => this.setState({anchorEl: null});

    changeLocale = locale => {

        const {changeLocale} = this.props;

        changeLocale(locale).then(this.handleClose);
    };

    render() {

        const {anchorEl} = this.state;
        const {locale} = this.props;

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
                {Object.keys(LOCALES).map(l =>
                    <MenuItem
                        key={l}
                        onClick={() => this.changeLocale(l)}
                        selected={l === locale}
                    >
                        {LOCALES[l]}
                    </MenuItem>
                )}
            </Menu>
        </div>;
    }
}
