import React from 'react';
import {
    Create,
    FormTab,
    TabbedForm,
    TextInput,
    TranslatableInputs,
    required
} from 'react-admin';

import TagsInput from '../input/TagsInput';
import {useLocales} from '../../commons/AppContext';
import {useIdValidation} from '../validation';
import Images from './Images';

export default props => {

    const locales = useLocales();
    const validateId = useIdValidation(props);

    const transform = ({images, ...rest}) =>
        images ? {
            ...rest,
            files: Object.values(images).flat()
        } : rest
    ;

    return <Create {...props} {...{transform}}>
        <TabbedForm>
            <FormTab label="pos.general">
                <TextInput
                    source="id"
                    validate={[required(), validateId]}
                />
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
    </Create>;
};
