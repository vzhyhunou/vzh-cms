import React from 'react';
import {SelectArrayInput, useResourceContext, useTranslate} from 'react-admin';

import {useContextProvider} from '../..';

export default () => {

    const translate = useTranslate();
    const resource = useResourceContext();
    const {tags} = useContextProvider();

    return <SelectArrayInput
        source="tags"
        choices={Object.keys(tags[resource]).map(id => ({
            id,
            name: translate(`resources.${resource}.tags.${id}`)
        }))}
        label={`resources.${resource}.fields.tags`}
    />;
};
