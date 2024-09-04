import React, {useState} from 'react';
import {Button, useResourceContext, useTranslate} from 'react-admin';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import {useContextProvider} from '../..';
import useUpdateTag from './useUpdateTag';

export default ({label, children, getData}) => {

    const translate = useTranslate();
    const resource = useResourceContext();
    const [anchorEl, setAnchorEl] = useState(null);
    const updateTag = useUpdateTag(getData);
    const {resources} = useContextProvider();

    return <>
        <Button
            label={label}
            aria-controls={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={e => setAnchorEl(e.currentTarget)}
        >
            {children}
        </Button>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => setAnchorEl(null)}
        >
            {Object.keys(resources[resource].tags).map(name =>
                <MenuItem
                    key={name}
                    onClick={() => updateTag(name)}
                >
                    {translate(`resources.${resource}.tags.${name}`)}
                </MenuItem>
            )}
        </Menu>
    </>;
};
