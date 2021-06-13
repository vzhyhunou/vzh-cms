import React from 'react';
import {
    DateField,
    Edit,
    FormTab,
    ReferenceField,
    TabbedForm,
    TextField,
    required,
    minLength,
    PasswordInput
} from 'react-admin';

import TagsInput from '../input/TagsInput';

export default props =>
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
                <PasswordInput
                    source="password"
                    validate={[required(), minLength(5)]}
                />
            </FormTab>
            <FormTab label="resources.users.fields.tags">
                <TagsInput/>
            </FormTab>
        </TabbedForm>
    </Edit>
;
