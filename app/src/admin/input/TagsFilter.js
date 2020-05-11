import React from 'react';
import {SelectArrayInput} from 'react-admin';

import {useMessages} from '../../commons/TranslationContext';

const TagsFilter = ({addField, resource, ...rest}) => {

    const messages = useMessages();

    return <SelectArrayInput
        {...rest}
        choices={Object.keys(messages.resources[resource].tags).map(tag => ({
            id: tag,
            name: `resources.${resource}.tags.${tag}`
        }))}
        label={`resources.${resource}.fields.tags`}
    />;
};

TagsFilter.defaultProps = {
    addField: true,
    source: 'tags',
};

export default TagsFilter;
