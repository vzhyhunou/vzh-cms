import React from 'react';
import {Create, SimpleForm, TextInput} from 'react-admin';

import TagsInput from '../input/TagsInput';

export default (props) =>
    <Create {...props}>
        <SimpleForm>
            <TextInput
                source="id"
            />
            <TextInput
                source="password"
                type="password"
            />
            <TagsInput/>
        </SimpleForm>
    </Create>
;
