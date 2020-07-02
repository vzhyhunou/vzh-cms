import React, {Fragment} from 'react';
import {
    BulkDeleteButton,
    Datagrid,
    EditButton,
    Filter,
    List,
    TextField,
    TextInput,
    useLocale
} from 'react-admin';

import TagsField from '../field/TagsField';
import TagsFilter from '../input/TagsFilter';
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
    <a href={`/page/${record[source]}`}>{record[source]}</a>
;

export default props => {

    const locale = useLocale();

    return <List
        {...props}
        filters={<PageFilter locale={locale}/>}
        bulkActionButtons={<PostBulkActionButtons/>}
        exporter={false}
    >
        <Datagrid>
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
