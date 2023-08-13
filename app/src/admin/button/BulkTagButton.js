import React, {useState} from 'react';
import {Button, useResourceContext} from 'react-admin';
import {Menu, MenuItem} from '@mui/material';

import {useLocaleProvider} from '../../commons';
import useUpdateTag from './useUpdateTag';

export default ({label, children, getData}) => {

    const {useMessages} = useLocaleProvider();
    const resource = useResourceContext();
    const [anchorEl, setAnchorEl] = useState(null);
    const updateTag = useUpdateTag(getData);
    const messages = useMessages();

    return messages && <>
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
            {Object.entries(messages.resources[resource].tags).map(([key, value]) =>
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
