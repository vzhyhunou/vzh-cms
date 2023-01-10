import React from 'react';
import {
    Create,
    FormTab,
    TabbedForm,
    TextInput,
    required,
    minLength,
    PasswordInput
} from 'react-admin';

import {TagsInput} from '../input';
import {useIdValidation} from '../validation';

export default () => {

    const validateId = useIdValidation();

    return <Create>
        <TabbedForm>
            <FormTab label="resources.general">
                <TextInput
                    source="id"
                    validate={[required(), validateId]}
                />
                <PasswordInput
                    source="password"
                    validate={[required(), minLength(5)]}
                />
            </FormTab>
            <FormTab label="resources.users.fields.tags">
                <TagsInput/>
            </FormTab>
        </TabbedForm>
    </Create>;
};
