import React from 'react';
import {
    Datagrid,
    EditButton,
    List,
    TextField,
    TextInput,
    useLocale
} from 'react-admin';

import {TagsField, LinkField, TagsFilter, BulkActionButtons} from '../..';

export default () => {

    const filters = [
        <TextInput
            source="id"
            alwaysOn
        />,
        <TagsFilter
            source="tags"
        />,
        <TextInput
            source="title"
        />,
        <TextInput
            source="content"
        />
    ];
    const locale = useLocale();

    return <List
        {...{filters}}
        exporter={false}
    >
        <Datagrid bulkActionButtons={<BulkActionButtons/>} rowClick={false}>
            <LinkField
                source="id"
            />
            <TextField
                source={`title.${locale}`}
                label="resources.pages.fields.title"
                sortable={false}
            />
            <TagsField
                sortable={false}
                source="tags"
            />
            <EditButton/>
        </Datagrid>
    </List>;
};
