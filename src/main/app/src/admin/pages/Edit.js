import React from 'react';
import {Edit, FormTab, ImageField, LongTextInput, TabbedForm, TextInput} from 'react-admin';

import TagsInput from '../input/TagsInput';
import {withTranslation} from '../../commons/TranslationContext';
import ContentImageInput from '../input/ContentImageInput';

const PageEdit = ({locale, locales, ...rest}) =>
    <Edit {...rest}>
        <TabbedForm>
            <FormTab label="pos.general">
                <TagsInput/>
            </FormTab>
            {Object.keys(locales).map((l, i) =>
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
                        <ImageField source="src" title="title"/>
                    </ContentImageInput>
                </FormTab>
            )}
        </TabbedForm>
    </Edit>
;

export default withTranslation(PageEdit);
