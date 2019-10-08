import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import {Button, crudUpdateMany} from 'react-admin';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import compose from 'recompose/compose';

import {withTranslation} from '../../commons/TranslationContext';

const BulkTagButton = ({
                           basePath,
                           crudUpdateMany,
                           resource,
                           selectedIds,
                           messages,
                           label,
                           children,
                           data,
                           getSelectedRecords
                       }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const update = tag => {
        crudUpdateMany(resource, selectedIds, data(getSelectedRecords(), tag), basePath);
        setAnchorEl(null);
    };
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
                    onClick={() => update(tag)}
                >
                    {tags[tag]}
                </MenuItem>
            )}
        </Menu>
    </Fragment>;
};

export default compose(
    connect(
        undefined,
        {crudUpdateMany}
    ),
    withTranslation
)(BulkTagButton);
