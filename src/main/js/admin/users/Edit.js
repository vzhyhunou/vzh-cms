import React from 'react';
import {Edit, SimpleForm, TextInput} from 'react-admin';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';

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
