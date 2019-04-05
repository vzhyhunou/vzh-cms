import React from 'react';
import {Create, FormTab, LongTextInput, TabbedForm, TextInput} from 'react-admin';

import {locales} from '../../commons/locale';
import ContentImageToolbar from '../form/ContentImageToolbar';
import TagsInput from '../input/TagsInput';
import EditionProvider from '../EditionContext';
import {withTranslation} from '../../commons/TranslationContext';

const PageCreate = ({locale, ...rest}) =>
    <EditionProvider>
        <Create {...rest}>
            <TabbedForm toolbar={<ContentImageToolbar/>}>
                <FormTab label="pos.general">
                    <TextInput
                        source="id"
                    />
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
        </Create>
    </EditionProvider>
;

export default withTranslation(PageCreate);
