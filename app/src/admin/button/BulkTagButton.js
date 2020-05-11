import React, {Fragment, useState} from 'react';
import {Button} from 'react-admin';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import {useMessages} from '../../commons/TranslationContext';
import useUpdateTag from './useUpdateTag';

export default ({resource, selectedIds, label, children, data}) => {

    const messages = useMessages();
    const [anchorEl, setAnchorEl] = useState(null);
    const updateTag = useUpdateTag(resource, selectedIds, data);
    const {tags} = messages.resources[resource];

    return <Fragment>
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
            {Object.keys(tags).map(tag =>
                <MenuItem
                    key={tag}
                    onClick={() => updateTag(tag)}
                >
                    {tags[tag]}
                </MenuItem>
            )}
        </Menu>
    </Fragment>;
};
