'use strict';

import React from 'react';
import {
    Create,
    Datagrid,
    Edit,
    EditButton,
    Filter,
    FormTab,
    getLocale,
    List,
    LongTextInput,
    TabbedForm,
    TextField,
    TextInput
} from 'react-admin';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import LOCALES from "../commons/locales";

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

const withLocale = component => compose(
    connect(
        state => ({
            locale: getLocale(state)
        }),
        {}
    )
)(component);

export const PageList = withLocale(({locale, ...props}) =>
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
);

export const PageEdit = withLocale(({locale, ...props}) =>
    <Edit {...props}>
        <TabbedForm>
            {tabs(locale)}
        </TabbedForm>
    </Edit>
);

export const PageCreate = withLocale(({locale, ...props}) =>
    <Create {...props}>
        <TabbedForm>
            <FormTab label="pos.general">
                <TextInput
                    source="id"
                />
            </FormTab>
            {tabs(locale)}
        </TabbedForm>
    </Create>
);

const tabs = locale =>
    Object.keys(LOCALES).map(l =>
        <FormTab key={l} label={l}>
            <TextInput
                source={`properties.${l}.title`}
                label={`resources.pages.fields.properties.${locale}.title`}
            />
            <LongTextInput
                source={`properties.${l}.content`}
                label={`resources.pages.fields.properties.${locale}.content`}
                options={{rows: 20}}
            />
        </FormTab>
    )
;
