import React from 'react';
import {
    Datagrid,
    EditButton,
    List,
    TextField,
    TextInput
} from 'react-admin';

import {TagsField} from '../field';
import {TagsFilter} from '../input';
import {BulkActionButtons} from '../button';

const filters = [
    <TextInput
        source="id"
        alwaysOn
    />,
    <TagsFilter/>
];

export default () =>
    <List
        {...{filters}}
        exporter={false}
    >
        <Datagrid bulkActionButtons={<BulkActionButtons/>}>
            <TextField
                source="id"
            />
            <TagsField
                sortable={false}
            />
            <EditButton/>
        </Datagrid>
    </List>
;
