import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import {useLocale, useLocales, useUpdateLocale} from './TranslationContext';

export default () => {

    const locale = useLocale();
    const locales = useLocales();
    const updateLocale = useUpdateLocale();
    const [anchorEl, setAnchorEl] = useState(null);
    const update = locale => updateLocale(locale).then(() => setAnchorEl(null));

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
                    onClick={() => update(l)}
                    selected={l === locale}
                >
                    {locales[l]}
                </MenuItem>
            )}
        </Menu>
    </div>;
};
