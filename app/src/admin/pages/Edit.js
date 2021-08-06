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
    usePermissions
} from 'react-admin';

import TagsInput from '../input/TagsInput';
import {useLocales} from '../../commons/AppContext';
import {MANAGER} from '../../commons/roles';
import Images from './Images';
import transform from './transform';

export default props => {

    const locales = useLocales();
    const {permissions} = usePermissions();

    return <Edit {...props} {...{transform}}>
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
                    <Images
                        source="images"
                    />
                </TranslatableInputs>
            </FormTab>
            <FormTab label="resources.pages.fields.tags">
                <TagsInput/>
            </FormTab>
        </TabbedForm>
    </Edit>;
};
