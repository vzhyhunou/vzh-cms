import React from 'react';
import {
    ImageField
} from 'react-admin';
import {useFormState} from 'react-final-form';

import ContentImageInput from '../input/ContentImageInput';

export default props => {

    const {values} = useFormState();
    const {files} = values;

    return <ContentImageInput
       multiple
       source="images"
       accept="image/*"
       initialValue={files}
       {...props}
   >
       <ImageField
           source="src"
           title="title"
       />
   </ContentImageInput>;
};
