import React from 'react';
import {Create, FormTab, TabbedForm, TextInput} from 'react-admin';

import TagsInput from '../input/TagsInput';

export default (props) =>
    <Create {...props}>
        <TabbedForm>
            <FormTab label="pos.general">
                <TextInput
                    source="id"
                />
                <TextInput
                    source="password"
                    type="password"
                />
            </FormTab>
            <FormTab label="pos.tags">
                <TagsInput/>
            </FormTab>
        </TabbedForm>
    </Create>
;
