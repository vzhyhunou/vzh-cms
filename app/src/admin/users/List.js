import React from 'react';
import {
    Datagrid,
    EditButton,
    Filter,
    List,
    TextField,
    TextInput
} from 'react-admin';

import TagsField from '../field/TagsField';
import TagsFilter from '../input/TagsFilter';
import BulkActionButtons from '../button/BulkActionButtons';

const UserFilter = props =>
    <Filter {...props}>
        <TextInput
            source="id"
            alwaysOn
        />
        <TagsFilter/>
    </Filter>
;

export default props =>
    <List
        {...props}
        filters={<UserFilter/>}
        bulkActionButtons={<BulkActionButtons/>}
        exporter={false}
    >
        <Datagrid>
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
