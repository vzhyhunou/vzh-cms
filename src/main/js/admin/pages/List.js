import React from 'react';
import {Datagrid, EditButton, Filter, getLocale, List, TextField, TextInput} from 'react-admin';
import {connect} from 'react-redux';

const PageFilter = ({locale, ...rest}) => (
    <Filter {...rest}>
        <TextInput
            source="id"
            alwaysOn
        />
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
            <EditButton/>
        </Datagrid>
    </List>
;

export default connect(
    state => ({
        locale: getLocale(state)
    }),
    {}
)(PageList);
