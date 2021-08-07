import React from 'react';
import {
    DateField,
    Edit,
    FormTab,
    ReferenceField,
    TabbedForm,
    TextField,
    TextInput,
    ImageField,
    TranslatableInputs,
    usePermissions
} from 'react-admin';

import TagsInput from '../input/TagsInput';
import {useLocales} from '../../commons/AppContext';
import {MANAGER} from '../../commons/roles';
import ContentImageInput from '../input/ContentImageInput';

export default props => {

    const locales = useLocales();
    const {permissions} = usePermissions();

    return <Edit {...props}>
        <TabbedForm>
            <FormTab label="pos.general">
                <DateField
                    source="date"
                    showTime
                />
                {permissions && permissions.includes(MANAGER) &&
                    <ReferenceField
                        source="userId"
                        reference="users"
                        allowEmpty={true}
                    >
                        <TextField source="id"/>
                    </ReferenceField>
                }
                <TranslatableInputs locales={Object.keys(locales)}>
                    <TextInput
                        source="title"
                    />
                    <TextInput
                        multiline
                        fullWidth
                        source="content"
                    />
                    <ContentImageInput
                        multiple
                        source="@files.content"
                        accept="image/*"
                    >
                        <ImageField
                            source="src"
                            title="title"
                        />
                    </ContentImageInput>
                </TranslatableInputs>
            </FormTab>
            <FormTab label="resources.pages.fields.tags">
                <TagsInput/>
            </FormTab>
        </TabbedForm>
    </Edit>;
};
