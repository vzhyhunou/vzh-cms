import React from 'react';
import {Datagrid, EditButton, Filter, List, TextField, TextInput} from 'react-admin';

import TagsField from '../field/TagsField';
import TagsFilter from '../input/TagsFilter';

const PageFilter = props => (
    <Filter {...props}>
        <TextInput
            source="id"
            alwaysOn
        />
        <TagsFilter/>
        <TextInput
            source="title"
            label={`resources.pages.fields.property.title`}
        />
        <TextInput
            source="content"
            label={`resources.pages.fields.property.content`}
        />
    </Filter>
);

const LinkField = ({source, record = {}}) =>
    <a href={`/pages/${record[source]}`}>{record[source]}</a>
;

export default props =>
    <List {...props} filters={<PageFilter/>}>
        <Datagrid>
            <LinkField
                source="id"
            />
            <TextField
                source={`property.title`}
                sortable={false}
            />
            <TagsField
                sortable={false}
            />
            <EditButton/>
        </Datagrid>
    </List>
;
