import React from 'react';
import {
    ImageField,
    useTranslatableContext
} from 'react-admin';
import {useFormContext, useWatch} from 'react-hook-form';

import ContentImageInput from '../input/ContentImageInput';

const Input = ({contentRef, ...rest}) => {

    const {setValue} = useFormContext();
    const val = useWatch({name: 'content'});
    const {selectedLocale} = useTranslatableContext();
    const onAdd = ({title}) => {
        const {selectionStart, selectionEnd} = contentRef.current;
        let c = `<img src="${title}"/>`;
        if (val) {
            const v = val[selectedLocale];
            if (v) {
                c = v.slice(0, selectionStart) + c + v.slice(selectionEnd);
            }
        }
        setValue(`content.${selectedLocale}`, c);
    };

    return <ContentImageInput
        multiple
        accept="image/*"
        {...{...rest, onAdd}}
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
