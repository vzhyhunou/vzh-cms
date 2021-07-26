import React from 'react';
import {
    Datagrid,
    EditButton,
    Filter,
    List,
    TextField,
    TextInput,
    useLocale
} from 'react-admin';

import TagsField from '../field/TagsField';
import LinkField from '../field/LinkField';
import TagsFilter from '../input/TagsFilter';
import BulkActionButtons from '../button/BulkActionButtons';

const PageFilter = props =>
    <Filter {...props}>
        <TextInput
            source="id"
            alwaysOn
        />
        <TagsFilter/>
        <TextInput
            source="title"
        />
        <TextInput
            source="content"
        />
    </Filter>
;

export default props => {

    const locale = useLocale();

    return <List
        {...props}
        filters={<PageFilter/>}
        bulkActionButtons={<BulkActionButtons/>}
        exporter={false}
    >
        <Datagrid>
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
