import React from 'react';
import {Create, FormTab, ImageField, LongTextInput, TabbedForm, TextInput} from 'react-admin';

import TagsInput from '../input/TagsInput';
import {withSanitizedTranslation} from '../../commons/TranslationContext';
import ContentImageInput from '../input/ContentImageInput';

const PageCreate = ({locales, ...rest}) =>
    <Create {...rest}>
        <TabbedForm>
            <FormTab label="pos.general">
                <TextInput
                    source="id"
                />
            </FormTab>
            <FormTab label="resources.pages.fields.tags">
                <TagsInput/>
            </FormTab>
            {Object.keys(locales).map(l =>
                <FormTab key={l} label={l}>
                    <TextInput
                        source={`properties.${l}.title`}
                        label={`resources.pages.fields.property.title`}
                    />
                    <LongTextInput
                        source={`properties.${l}.content`}
                        label={`resources.pages.fields.property.content`}
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
    </Create>
;

export default withSanitizedTranslation(PageCreate);
