import React, {useRef} from 'react';
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

import {useContextProvider, TagsInput} from '../../..';
import Input from './Input';

export default () => {

    const locales = useLocales();
    const {permissions} = usePermissions();
    const {tags: {users: {MANAGER}}} = useContextProvider();
    const ref = useRef();

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
    </Edit>;
};
