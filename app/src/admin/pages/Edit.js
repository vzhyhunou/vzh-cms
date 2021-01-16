import React from 'react';
import {
    DateField,
    Edit,
    FormTab,
    ImageField,
    ReferenceField,
    TabbedForm,
    TextField,
    TextInput,
    usePermissions,
    useLocale
} from 'react-admin';

import TagsInput from '../input/TagsInput';
import {useLocales} from '../../commons/AppContext';
import ContentImageInput from '../input/ContentImageInput';
import {MANAGER} from '../../commons/roles';

export default props => {

    const locale = useLocale();
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
            </FormTab>
            <FormTab label="resources.pages.fields.tags">
                <TagsInput/>
            </FormTab>
            {Object.keys(locales).map(l =>
                <FormTab key={l} label={l}>
                    <TextInput
                        source={`properties.${l}.title`}
                        label={`resources.pages.fields.properties.${locale}.title`}
                    />
                    <TextInput
                        multiline
                        fullWidth
                        source={`properties.${l}.content`}
                        label={`resources.pages.fields.properties.${locale}.content`}
                    />
                    <ContentImageInput
                        multiple
                        source="files"
                        accept="image/*"
                    >
                        <ImageField
                            source="src"
                            title="title"
                        />
                    </ContentImageInput>
                </FormTab>
            )}
        </TabbedForm>
    </Edit>;
};
