import React from 'react';
import {
    Datagrid,
    EditButton,
    List,
    SelectArrayInput,
    TextField,
    TextInput
} from 'react-admin';

import {ConstantField, ConstantInput, BulkActionButtons} from '../..';

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
            <ConstantField
                sortable={false}
                source="tags"
                sources="tags"
                property="name"
            />
            <EditButton/>
        </Datagrid>
    </List>;
};