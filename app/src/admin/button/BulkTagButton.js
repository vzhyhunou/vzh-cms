import React, {useState} from 'react';
import {Button} from 'react-admin';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import {useGetMessages} from '../../commons/AppContext';
import useUpdateTag from './useUpdateTag';

export default ({resource, selectedIds, label, children, data}) => {

    const getMessages = useGetMessages();
    const [anchorEl, setAnchorEl] = useState(null);
    const updateTag = useUpdateTag(resource, selectedIds, data);
    const {tags} = getMessages().resources[resource];

    return <>
        <Button
            label={label}
            aria-owns={anchorEl ? 'simple-menu' : null}
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
