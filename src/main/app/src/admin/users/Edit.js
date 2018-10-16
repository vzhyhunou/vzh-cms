import React from 'react';
import {Edit, SimpleForm, TextInput} from 'react-admin';

import TagsInput from '../input/TagsInput';

export default (props) =>
    <Edit {...props}>
        <SimpleForm>
            <TextInput
                source="password"
                type="password"
            />
            <TagsInput/>
        </SimpleForm>
    </Edit>
;
