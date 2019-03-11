import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {connect} from 'react-redux';
import {changeLocale, getLocale} from 'react-admin';

import {locales} from './locales';

class Locale extends Component {

    state = {
        anchorEl: null
    };

    handleClick = e => this.setState({anchorEl: e.currentTarget});

    handleClose = () => this.setState({anchorEl: null});

    changeLocale = locale => {

        const {changeLocale} = this.props;

        changeLocale(locale);
        this.handleClose();
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
                {Object.keys(locales).map(l =>
                    <MenuItem
                        key={l}
                        onClick={() => this.changeLocale(l)}
                        selected={l === locale}
                    >
                        {locales[l]}
                    </MenuItem>
                )}
            </Menu>
        </div>;
    }
}

export default connect(
    state => ({
        locale: getLocale(state)
    }),
    {changeLocale}
)(Locale);
