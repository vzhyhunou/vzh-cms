import React from 'react';
import {SelectArrayInput, useResourceContext} from 'react-admin';

import {useGetMessages} from '../../commons';

const TagsFilter = () => {

    const getMessages = useGetMessages();
    const resource = useResourceContext();
    const {tags} = getMessages().resources[resource];

    return <SelectArrayInput
        source="tags"
        choices={Object.entries(tags).map(([key, value]) => ({
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
