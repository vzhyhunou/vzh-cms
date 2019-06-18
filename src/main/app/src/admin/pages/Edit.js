import React from 'react';
import {
    DateField,
    Edit,
    FormTab,
    ImageField,
    LongTextInput,
    ReferenceField,
    TabbedForm,
    TextField,
    TextInput
} from 'react-admin';

import TagsInput from '../input/TagsInput';
import {withSanitizedTranslation} from '../../commons/TranslationContext';
import ContentImageInput from '../input/ContentImageInput';

const PageEdit = ({locale, locales, ...rest}) =>
    <Edit {...rest}>
        <TabbedForm>
            <FormTab label="pos.general">
                <DateField
                    source="date"
                    showTime
                />
                <ReferenceField
                    source="userId"
                    reference="users"
                    allowEmpty={true}
                >
                    <TextField source="id"/>
                </ReferenceField>
                <TagsInput/>
            </FormTab>
            {Object.keys(locales).map(l =>
                <FormTab key={l} label={l}>
                    <TextInput
                        source={`properties.${l}.title`}
                        label={`resources.pages.fields.properties.${locale}.title`}
                    />
                    <LongTextInput
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
    </Edit>
;

export default withSanitizedTranslation(PageEdit);
