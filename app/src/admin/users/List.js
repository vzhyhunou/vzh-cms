import React, {createRef, Fragment} from 'react';
import {BulkDeleteButton, Datagrid, EditButton, Filter, List, TextField, TextInput} from 'react-admin';

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

export default props => {

    const myDataGrid = createRef();

    const getSelectedRecords = () => {
        const gridProps = myDataGrid.current.props;
        return gridProps.selectedIds.map(id => gridProps.data[id]);
    };

    return <List
        {...props}
        filters={<UserFilter/>}
        bulkActionButtons={<PostBulkActionButtons getSelectedRecords={getSelectedRecords}/>}
    >
        <Datagrid ref={myDataGrid}>
            <TextField
                source="id"
            />
            <TagsField
                sortable={false}
            />
            <EditButton/>
        </Datagrid>
    </List>;
};
