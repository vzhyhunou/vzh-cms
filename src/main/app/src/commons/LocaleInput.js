import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import {withTranslationUpdate} from './TranslationContext';

class LocaleInput extends Component {

    state = {
        anchorEl: null
    };

    handleClick = e => this.setState({anchorEl: e.currentTarget});

    handleClose = () => this.setState({anchorEl: null});

    changeLocale = locale => {

        const {updateLocale} = this.props;

        updateLocale(locale);
        this.handleClose();
    };

    render() {

        const {anchorEl} = this.state;
        const {locale, locales} = this.props;

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

export default withTranslationUpdate(LocaleInput);
