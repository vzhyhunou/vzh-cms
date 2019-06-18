import React from 'react';
import {DateField, Edit, FormTab, ReferenceField, TabbedForm, TextField, TextInput} from 'react-admin';

import TagsInput from '../input/TagsInput';

export default (props) =>
    <Edit {...props}>
        <TabbedForm>
            <FormTab label="pos.general">
                <DateField
                    source="date"
                    showTime
                />
                <ReferenceField
                    source="userId"
                    reference="users"
                    allowEmpty={true}
                >
                    <TextField source="id"/>
                </ReferenceField>
                <TextInput
                    source="password"
                    type="password"
                />
            </FormTab>
            <FormTab label="resources.users.fields.tags">
                <TagsInput/>
            </FormTab>
        </TabbedForm>
    </Edit>
;
