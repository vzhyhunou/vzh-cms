import React from 'react';
import {Datagrid, EditButton, Filter, getLocale, List, TextField, TextInput} from 'react-admin';
import {connect} from 'react-redux';
import compose from 'recompose/compose';

const PageFilter = ({locale, ...props}) => (
    <Filter {...props}>
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

const PageList = ({locale, ...props}) =>
    <List {...props} filters={<PageFilter locale={locale}/>}>
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

export default compose(
    connect(
        state => ({
            locale: getLocale(state)
        }),
        {}
    )
)(PageList);
