import React from 'react';
import {
    Datagrid,
    EditButton,
    List,
    SelectArrayInput,
    TextField,
    TextInput,
    useLocale
} from 'react-admin';

import {ConstantField, LinkField, ConstantInput, BulkActionButtons} from '../..';

export default () => {

    const filters = [
        <TextInput
            source="id"
            alwaysOn
        />,
        <ConstantInput
            source="tags"
            sources="tags"
            component={SelectArrayInput}
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
            <ConstantField
                sortable={false}
                source="tags"
                property="name"
            />
            <EditButton/>
        </Datagrid>
    </List>;
};