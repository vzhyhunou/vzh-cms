import React from 'react';
import {Datagrid, EditButton, Filter, List, TextField, TextInput} from 'react-admin';

import TagsField from '../field/TagsField';
import TagsFilter from '../input/TagsFilter';
import {withSanitizedTranslation} from '../../commons/TranslationContext';

const PageFilter = ({locale, ...rest}) => (
    <Filter {...rest}>
        <TextInput
            source="id"
            alwaysOn
        />
        <TagsFilter label="pos.tags"/>
        <TextInput
            source="title"
            label={`resources.pages.fields.properties.${locale}.title`}
        />
        <TextInput
            source="content"
            label={`resources.pages.fields.properties.${locale}.content`}
        />
    </Filter>
);

const LinkField = ({source, record = {}}) =>
    <a href={`/pages/${record[source]}`}>{record[source]}</a>
;

const PageList = ({locale, ...rest}) =>
    <List {...rest} filters={<PageFilter locale={locale}/>}>
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
    </List>
;

export default withSanitizedTranslation(PageList);
