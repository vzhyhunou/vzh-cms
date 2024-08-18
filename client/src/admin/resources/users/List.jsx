import React from 'react';
import {
    Datagrid,
    EditButton,
    List,
    TextField,
    TextInput
} from 'react-admin';

import {TagsField, TagsFilter, BulkActionButtons} from '../..';

export default () => {

    const filters = [
        <TextInput
            source="id"
            alwaysOn
        />,
        <TagsFilter
            source="tags"
        />
    ];

    return <List
        {...{filters}}
        exporter={false}
    >
        <Datagrid bulkActionButtons={<BulkActionButtons/>} rowClick={false}>
            <TextField
                source="id"
            />
            <TagsField
                sortable={false}
                source="tags"
            />
            <EditButton/>
        </Datagrid>
    </List>;
};
