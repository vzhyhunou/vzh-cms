import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import {withTranslationUpdate} from './TranslationContext';

const LocaleInput = ({locale, locales, updateLocale}) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const changeLocale = locale => {
        updateLocale(locale);
        setAnchorEl(null);
    };

    return <div>
        <Button
            aria-owns={anchorEl ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={e => setAnchorEl(e.currentTarget)}
            color="inherit"
        >
            {locale}
        </Button>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
        >
            {Object.keys(locales).map(l =>
                <MenuItem
                    key={l}
                    onClick={() => changeLocale(l)}
                    selected={l === locale}
                >
                    {locales[l]}
                </MenuItem>
            )}
        </Menu>
    </div>;
};

export default withTranslationUpdate(LocaleInput);
