import React, {useState} from 'react';
import {Button, useResourceContext, useTranslate} from 'react-admin';
import {Menu, MenuItem} from '@mui/material';

import {useContextProvider} from '../..';
import useUpdateTag from './useUpdateTag';

export default ({label, children, getData}) => {

    const translate = useTranslate();
    const resource = useResourceContext();
    const [anchorEl, setAnchorEl] = useState(null);
    const updateTag = useUpdateTag(getData);
    const {tags} = useContextProvider();

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
            {Object.keys(tags[resource]).map(key =>
                <MenuItem
                    {...{key}}
                    onClick={() => updateTag(key)}
                >
                    {translate(`resources.${resource}.tags.${key}`)}
                </MenuItem>
            )}
        </Menu>
    </>;
};
