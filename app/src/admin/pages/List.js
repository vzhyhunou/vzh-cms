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
import {Link} from 'react-router-dom';

import TagsField from '../field/TagsField';
import TagsFilter from '../input/TagsFilter';
import BulkActionButtons from '../button/BulkActionButtons';

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

const LinkField = ({source, record = {}}) =>
    <Link to={`/cms/pages/${record[source]}`}>{record[source]}</Link>
;

export default props => {

    const locale = useLocale();

    return <List
        {...props}
        filters={<PageFilter locale={locale}/>}
        bulkActionButtons={<BulkActionButtons/>}
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
