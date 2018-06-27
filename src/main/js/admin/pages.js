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

const PageFilter = props => (
    <Filter {...props}>
        <TextInput
            label="Id"
            source="id"
            alwaysOn
        />
    </Filter>
);

const LinkField = ({source, record = {}}) =>
    <a href={`/pages/${record[source]}`}>{record[source]}</a>
;

const PageListLocale = ({locale, ...props}) =>
    <List {...props} filters={<PageFilter/>}>
        <Datagrid>
            <LinkField
                source="id"
            />
            <TextField
                source={`properties.${locale}.title`}
                label="resources.pages.fields.title"
                sortable={false}
            />
            <EditButton/>
        </Datagrid>
    </List>
;

export const PageList = compose(
    connect(
        state => ({
            locale: getLocale(state)
        }),
        {}
    )
)(PageListLocale);

export const PageEdit = props =>
    <Edit {...props}>
        <TabbedForm>
            {tabs()}
        </TabbedForm>
    </Edit>
;

export const PageCreate = props =>
    <Create {...props}>
        <TabbedForm>
            <FormTab label="pos.general">
                <TextInput
                    source="id"
                />
            </FormTab>
            {tabs()}
        </TabbedForm>
    </Create>
;

const tabs = () =>
    Object.keys(LOCALES).map(l =>
        <FormTab key={l} label={l}>
            <TextInput
                source={`properties.${l}.title`}
                label="resources.pages.fields.title"
            />
            <LongTextInput
                source={`properties.${l}.content`}
                label="resources.pages.fields.content"
                options={{rows: 20}}
            />
        </FormTab>
    )
;
