import React from 'react';
import {
    ImageField,
    useTranslatableContext
} from 'react-admin';
import {useForm, useFormState} from 'react-final-form';

import ContentImageInput from '../input/ContentImageInput';

export default props => {

    const form = useForm();
    const {values: {content}} = useFormState();
    const {selectedLocale} = useTranslatableContext();
    const onAdd = file => form.change(
        `content.${selectedLocale}`,
        content ? `${content[selectedLocale]}\n<img src="${file.src}"/>` : `<img src="${file.src}"/>`
    );

    return <ContentImageInput
        multiple
        accept="image/*"
        options={{onAdd}}
        {...props}
    >
        <ImageField
            source="src"
            title="title"
        />
    </ContentImageInput>;
};
