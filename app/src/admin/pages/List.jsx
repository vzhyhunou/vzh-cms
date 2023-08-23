import React from 'react';
import {
    Datagrid,
    EditButton,
    List,
    TextField,
    TextInput,
    useLocale
} from 'react-admin';

import {TagsField, LinkField} from '../field';
import {TagsFilter} from '../input';
import {BulkActionButtons} from '../button';

const filters = [
    <TextInput
        source="id"
        alwaysOn
    />,
    <TagsFilter/>,
    <TextInput
        source="title"
    />,
    <TextInput
        source="content"
    />
];

export default () => {

    const locale = useLocale();

    return <List
        {...{filters}}
        exporter={false}
    >
        <Datagrid bulkActionButtons={<BulkActionButtons/>}>
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
            />
            <EditButton/>
        </Datagrid>
    </List>;
};
