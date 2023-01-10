import React, {useState} from 'react';
import {Button, useResourceContext} from 'react-admin';
import {Menu, MenuItem} from '@mui/material';

import {useGetMessages} from '../../commons';
import useUpdateTag from './useUpdateTag';

export default ({label, children, getData}) => {

    const getMessages = useGetMessages();
    const resource = useResourceContext();
    const [anchorEl, setAnchorEl] = useState(null);
    const updateTag = useUpdateTag(getData);
    const {tags} = getMessages().resources[resource];

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
            {Object.entries(tags).map(([key, value]) =>
                <MenuItem
                    {...{key}}
                    onClick={() => updateTag(key)}
                >
                    {value}
                </MenuItem>
            )}
        </Menu>
    </>;
};
