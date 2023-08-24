import React from 'react';
import {
    Datagrid,
    EditButton,
    List,
    TextField,
    TextInput,
    useLocale
} from 'react-admin';

import TagsField from '../field/TagsField';
import LinkField from '../field/LinkField';
import TagsFilter from '../input/TagsFilter';
import BulkActionButtons from '../button/BulkActionButtons';

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
