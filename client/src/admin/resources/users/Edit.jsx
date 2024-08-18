import React from 'react';
import {
    DateField,
    Edit,
    FormTab,
    ReferenceField,
    TabbedForm,
    TextField,
    minLength,
    PasswordInput,
    Labeled
} from 'react-admin';

import {TagsInput} from '../..';

export default () =>
    <Edit>
        <TabbedForm>
            <FormTab label="resources.general">
                <Labeled source="date">
                    <DateField
                        source="date"
                        showTime
                    />
                </Labeled>
                <Labeled source="user">
                    <ReferenceField
                        source="userId"
                        reference="users"
                        allowEmpty={true}
                    >
                        <TextField source="id"/>
                    </ReferenceField>
                </Labeled>
                <PasswordInput
                    source="password"
                    validate={[minLength(5)]}
                />
            </FormTab>
            <FormTab label="resources.users.fields.tags">
                <TagsInput/>
            </FormTab>
        </TabbedForm>
    </Edit>
;
