import React from 'react';
import {SelectArrayInput, useResourceContext} from 'react-admin';

import {useLocaleProvider} from '../../commons';

const TagsFilter = () => {

    const {useMessages} = useLocaleProvider();
    const resource = useResourceContext();
    const messages = useMessages();

    return messages && <SelectArrayInput
        source="tags"
        choices={Object.entries(messages.resources[resource].tags).map(([key, value]) => ({
            id: key,
            name: value
        }))}
        label={`resources.${resource}.fields.tags`}
    />;
};

TagsFilter.defaultProps = {
    source: 'tags'
};

export default TagsFilter;
