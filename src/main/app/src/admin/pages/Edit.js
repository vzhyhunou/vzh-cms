import React from 'react';
import {Edit, FormTab, LongTextInput, TabbedForm, TextInput} from 'react-admin';

import ContentImageToolbar from '../form/ContentImageToolbar';
import TagsInput from '../input/TagsInput';
import {withTranslation} from '../../commons/TranslationContext';

const PageEdit = ({locale, locales, ...rest}) =>
    <Edit {...rest}>
        <TabbedForm toolbar={<ContentImageToolbar/>}>
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
                </FormTab>
            )}
        </TabbedForm>
    </Edit>
;

export default withTranslation(PageEdit);
