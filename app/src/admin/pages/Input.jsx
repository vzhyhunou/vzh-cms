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
    const onAdd = ({title}) => setValue(
        `content.${selectedLocale}`,
        val ? `${val[selectedLocale]}\n<img src="${title}"/>` : `<img src="${title}"/>`
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
