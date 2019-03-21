import React from 'react';
import {Edit, FormTab, LongTextInput, TabbedForm, TextInput, translate} from 'react-admin';

import {locales} from '../../commons/locale';
import ContentImageToolbar from '../form/ContentImageToolbar';
import TagsInput from '../input/TagsInput';

const PageEdit = ({locale, ...rest}) =>
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

export default translate(PageEdit);
