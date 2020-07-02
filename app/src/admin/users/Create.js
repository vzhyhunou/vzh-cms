import React from 'react';
import {
    Create,
    FormTab,
    TabbedForm,
    TextInput,
    required,
    PasswordInput
} from 'react-admin';

import TagsInput from '../input/TagsInput';

export default props =>
    <Create {...props}>
        <TabbedForm>
            <FormTab label="pos.general">
                <TextInput
                    source="id"
                    validate={[required()]}
                />
                <PasswordInput
                    source="password"
                />
            </FormTab>
            <FormTab label="resources.users.fields.tags">
                <TagsInput/>
            </FormTab>
        </TabbedForm>
    </Create>
;
