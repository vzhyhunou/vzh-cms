import React from 'react';
import {
    Create,
    FormTab,
    TabbedForm,
    TextInput,
    TranslatableInputs,
    required,
    useLocales
} from 'react-admin';

import {TagsInput} from '../input';
import {useIdValidation} from '../validation';
import Input from './Input';

export default () => {

    const locales = useLocales();
    const validateId = useIdValidation();

    return <Create>
        <TabbedForm>
            <FormTab label="resources.general">
                <TextInput
                    source="id"
                    validate={[required(), validateId]}
                />
                <TranslatableInputs locales={locales.map(l => l.locale)}>
                    <TextInput
                        fullWidth
                        source="title"
                    />
                    <TextInput
                        multiline
                        fullWidth
                        source="content"
                    />
                    <Input/>
                </TranslatableInputs>
            </FormTab>
            <FormTab label="resources.pages.fields.tags">
                <TagsInput/>
            </FormTab>
        </TabbedForm>
    </Create>;
};
