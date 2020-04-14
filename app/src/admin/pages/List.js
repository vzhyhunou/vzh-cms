import React, {createRef, Fragment} from 'react';
import {BulkDeleteButton, Datagrid, EditButton, Filter, List, TextField, TextInput} from 'react-admin';

import TagsField from '../field/TagsField';
import TagsFilter from '../input/TagsFilter';
import {withSanitizedTranslation} from '../../commons/TranslationContext';
import BulkAddTagButton from '../button/BulkAddTagButton';
import BulkRemoveTagButton from '../button/BulkRemoveTagButton';

const PageFilter = ({locale, ...rest}) =>
    <Filter {...rest}>
        <TextInput
            source="id"
            alwaysOn
        />
        <TagsFilter/>
        <TextInput
            source="title"
            label={`resources.pages.fields.properties.${locale}.title`}
        />
        <TextInput
            source="content"
            label={`resources.pages.fields.properties.${locale}.content`}
        />
    </Filter>
;

const PostBulkActionButtons = props =>
    <Fragment>
        <BulkAddTagButton {...props} />
        <BulkRemoveTagButton {...props} />
        <BulkDeleteButton {...props} />
    </Fragment>
;

const LinkField = ({source, record = {}}) =>
    <a href={`/pages/${record[source]}`}>{record[source]}</a>
;

const PageList = ({locale, ...rest}) => {

    const myDataGrid = createRef();

    const getSelectedRecords = () => {
        const gridProps = myDataGrid.current.props;
        return gridProps.selectedIds.map(id => gridProps.data[id]);
    };

    return <List
        {...rest}
        filters={<PageFilter locale={locale}/>}
        bulkActionButtons={<PostBulkActionButtons getSelectedRecords={getSelectedRecords}/>}
    >
        <Datagrid ref={myDataGrid}>
            <LinkField
                source="id"
            />
            <TextField
                source={`properties.${locale}.title`}
                sortable={false}
            />
            <TagsField
                sortable={false}
            />
            <EditButton/>
        </Datagrid>
    </List>;
};

export default withSanitizedTranslation(PageList);
