import React from 'react';
import {SelectArrayInput} from 'react-admin';

import {useGetMessages} from '../../commons/AppContext';

const TagsFilter = ({addField, resource, ...rest}) => {

    const getMessages = useGetMessages();
    const {tags} = getMessages().resources[resource];

    return <SelectArrayInput
        {...rest}
        choices={Object.keys(tags).map(tag => ({
            id: tag,
            name: tags[tag]
        }))}
        label={`resources.${resource}.fields.tags`}
    />;
};

TagsFilter.defaultProps = {
    addField: true,
    source: 'tags',
};

export default TagsFilter;
