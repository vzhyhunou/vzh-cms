import React, {useRef} from 'react';
import {
    Create,
    FormTab,
    TabbedForm,
    TextInput,
    TranslatableInputs,
    required,
    useLocales
} from 'react-admin';

import TagsInput from '../input/TagsInput';
import {useIdValidation} from '../validation';
import Input from './Input';

export default () => {

    const locales = useLocales();
    const validateId = useIdValidation();
    const ref = useRef();

    return <Create>
        <TabbedForm>
            <FormTab label="resources.general">
                <TextInput
                    source="id"
                    validate={[required(), validateId]}
                />
                <TranslatableInputs locales={locales.map(l => l.locale)} fullWidth>
                    <TextInput source="title"/>
                    <TextInput
                        multiline
                        source="content"
                        sx={{'.MuiInputBase-input': {fontFamily: 'Courier New'}}}
                        inputProps={{ref}}
                    />
                    <Input contentRef={ref}/>
                </TranslatableInputs>
            </FormTab>
            <FormTab label="resources.pages.fields.tags">
                <TagsInput/>
            </FormTab>
        </TabbedForm>
    </Create>;
};
