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

import TagsInput from '../input/TagsInput';
import {useIdValidation} from '../validation';

export default props => {

    const validateId = useIdValidation(props);

    return <Create {...props}>
        <TabbedForm>
            <FormTab label="pos.general">
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
