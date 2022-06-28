import React from 'react';
import {
    Create,
    FormTab,
    TabbedForm,
    TextInput,
    TranslatableInputs,
    required
} from 'react-admin';

import TagsInput from '../input/TagsInput';
import {useLocales} from '../../commons/AppContext';
import {useIdValidation} from '../validation';
import Input from './Input';

export default props => {

    const locales = useLocales();
    const validateId = useIdValidation(props);

    return <Create {...props}>
        <TabbedForm>
            <FormTab label="pos.general">
                <TextInput
                    source="id"
                    validate={[required(), validateId]}
                />
                <TranslatableInputs locales={Object.keys(locales)}>
                    <TextInput
                        source="title"
                    />
                    <TextInput
                        multiline
                        fullWidth
                        source="content"
                    />
                    <Input
                        source="@files.content"
                    />
                </TranslatableInputs>
            </FormTab>
            <FormTab label="resources.pages.fields.tags">
                <TagsInput/>
            </FormTab>
        </TabbedForm>
    </Create>;
};
