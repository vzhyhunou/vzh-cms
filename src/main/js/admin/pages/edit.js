import React from 'react';
import {Edit, FormTab, getLocale, LongTextInput, TabbedForm, TextInput} from 'react-admin';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import LOCALES from '../../commons/locales';

const PageEdit = ({locale, ...props}) =>
    <Edit {...props}>
        <TabbedForm>
            {Object.keys(LOCALES).map(l =>
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
            )}
        </TabbedForm>
    </Edit>
;

export default compose(
    connect(
        state => ({
            locale: getLocale(state)
        }),
        {}
    )
)(PageEdit);
