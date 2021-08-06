import React, {useEffect} from 'react';
import {
    ImageField
} from 'react-admin';
import {useFormState, useForm} from 'react-final-form';

import ContentImageInput from '../input/ContentImageInput';
import {useLocales} from '../../commons/AppContext';

export default props => {

    const locales = useLocales();
    const form = useForm();
    const {values} = useFormState();
    const {files, content} = values;

    useEffect(() => {
        files && form.change('images', Object.fromEntries(
            Object.keys(locales).map(l => [l, files.filter(f => content[l].includes(f.title))])
        ));
    }, [files]); // eslint-disable-line react-hooks/exhaustive-deps

    return <ContentImageInput
       multiple
       source="images"
       accept="image/*"
       {...props}
   >
       <ImageField
           source="src"
           title="title"
       />
   </ContentImageInput>;
};
