import React from 'react';
import {
    ImageField,
    useTranslatableContext
} from 'react-admin';
import {useFormContext, useWatch} from 'react-hook-form';

import ContentImageInput from '../input/ContentImageInput';

const Input = props => {

    const {setValue} = useFormContext();
    const val = useWatch({name: 'content'});
    const {selectedLocale} = useTranslatableContext();
    const onAdd = ({src}) => setValue(
        `content.${selectedLocale}`,
        val ? `${val[selectedLocale]}\n<img src="${src}"/>` : `<img src="${src}"/>`
    );

    return <ContentImageInput
        multiple
        accept="image/*"
        {...{...props, onAdd}}
    >
        <ImageField
            source="src"
            title="title"
        />
    </ContentImageInput>;
};

Input.defaultProps = {
    source: '@files.content'
};

export default Input;
