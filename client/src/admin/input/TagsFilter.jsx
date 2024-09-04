import React from 'react';
import {SelectArrayInput, useResourceContext, useTranslate} from 'react-admin';

import {useContextProvider} from '../..';

export default () => {

    const translate = useTranslate();
    const resource = useResourceContext();
    const {resources} = useContextProvider();

    return <SelectArrayInput
        source="tags"
        choices={Object.keys(resources[resource].tags).map(id => ({
            id,
            name: translate(`resources.${resource}.tags.${id}`)
        }))}
        label={`resources.${resource}.fields.tags`}
    />;
};
