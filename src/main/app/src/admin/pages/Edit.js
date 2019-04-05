import React from 'react';
import {Edit, FormTab, LongTextInput, TabbedForm, TextInput} from 'react-admin';

import {locales} from '../../commons/locale';
import ContentImageToolbar from '../form/ContentImageToolbar';
import TagsInput from '../input/TagsInput';
import EditionProvider from '../EditionContext';
import {withTranslation} from '../../commons/TranslationContext';

const PageEdit = ({locale, ...rest}) =>
    <EditionProvider>
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
    </EditionProvider>
;

export default withTranslation(PageEdit);
