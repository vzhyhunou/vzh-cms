import React from 'react';
import {SelectArrayInput} from 'react-admin';

import {useGetMessages} from '../../commons/AppContext';

const TagsFilter = ({addField, resource, ...rest}) => {

    const getMessages = useGetMessages();
    const {tags} = getMessages().resources[resource];

    return <SelectArrayInput
        {...rest}
        choices={Object.entries(tags).map(([key, value]) => ({
            id: key,
            name: value
        }))}
        label={`resources.${resource}.fields.tags`}
    />;
};

TagsFilter.defaultProps = {
    addField: true,
    source: 'tags',
};

export default TagsFilter;
