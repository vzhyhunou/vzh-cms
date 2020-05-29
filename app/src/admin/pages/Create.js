import React from 'react';
import {
    Create,
    FormTab,
    ImageField,
    TabbedForm,
    TextInput,
    useLocale
} from 'react-admin';

import TagsInput from '../input/TagsInput';
import {useLocales} from '../../commons/TranslationContext';
import ContentImageInput from '../input/ContentImageInput';

export default props => {

    const locale = useLocale();
    const locales = useLocales();

    return <Create {...props}>
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
    </Create>;
};
