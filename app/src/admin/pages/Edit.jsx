import React from 'react';
import {
    DateField,
    Edit,
    FormTab,
    ReferenceField,
    TabbedForm,
    TextField,
    TextInput,
    TranslatableInputs,
    usePermissions,
    useLocales,
    Labeled
} from 'react-admin';

import TagsInput from '../input/TagsInput';
import {useContextProvider} from '../../commons/AppContext';
import Input from './Input';

export default () => {

    const locales = useLocales();
    const {permissions} = usePermissions();
    const {roles: {MANAGER}} = useContextProvider();

    return <Edit>
        <TabbedForm>
            <FormTab label="resources.general">
                <Labeled source="date">
                    <DateField
                        source="date"
                        showTime
                    />
                </Labeled>
                {permissions && permissions.includes(MANAGER) &&
                    <Labeled source="user">
                        <ReferenceField
                            source="userId"
                            reference="users"
                            allowEmpty={true}
                        >
                            <TextField source="id"/>
                        </ReferenceField>
                    </Labeled>
                }
                <TranslatableInputs locales={locales.map(l => l.locale)}>
                    <TextInput
                        fullWidth
                        source="title"
                    />
                    <TextInput
                        multiline
                        fullWidth
                        source="content"
                        sx={{'.MuiInputBase-input': {fontFamily: 'Courier New'}}}
                    />
                    <Input/>
                </TranslatableInputs>
            </FormTab>
            <FormTab label="resources.pages.fields.tags">
                <TagsInput/>
            </FormTab>
        </TabbedForm>
    </Edit>;
};
