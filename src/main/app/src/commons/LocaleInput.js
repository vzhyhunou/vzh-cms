import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {connect} from 'react-redux';
import {changeLocale, translate} from 'react-admin';
import compose from 'recompose/compose';

import {locales} from './locale';

class LocaleInput extends Component {

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

export default compose(
    connect(
        undefined,
        {changeLocale}
    ),
    translate
)(LocaleInput);
