import React, {Fragment} from 'react';
import {
    BulkDeleteButton,
    Datagrid,
    EditButton,
    Filter,
    List,
    TextField,
    TextInput
} from 'react-admin';

import TagsField from '../field/TagsField';
import TagsFilter from '../input/TagsFilter';
import BulkAddTagButton from '../button/BulkAddTagButton';
import BulkRemoveTagButton from '../button/BulkRemoveTagButton';

const UserFilter = props =>
    <Filter {...props}>
        <TextInput
            source="id"
            alwaysOn
        />
        <TagsFilter/>
    </Filter>
;

const PostBulkActionButtons = props =>
    <Fragment>
        <BulkAddTagButton {...props} />
        <BulkRemoveTagButton {...props} />
        <BulkDeleteButton {...props} />
    </Fragment>
;

export default props =>
    <List
        {...props}
        filters={<UserFilter/>}
        bulkActionButtons={<PostBulkActionButtons/>}
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
