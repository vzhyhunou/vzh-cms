import React from 'react';
import {Datagrid, EditButton, Filter, List, TextField, TextInput} from 'react-admin';

import TagsField from '../field/TagsField';
import TagsFilter from '../input/TagsFilter';

const UserFilter = (props) => (
    <Filter {...props}>
        <TextInput
            source="id"
            alwaysOn
        />
        <TagsFilter label="pos.tags"/>
    </Filter>
);

export default (props) =>
    <List {...props} filters={<UserFilter/>}>
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
