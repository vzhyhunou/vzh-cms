import React from 'react';
import {ArrayInput, DateTimeInput, SelectInput, SimpleFormIterator} from 'react-admin';

import {useMessages} from '../../commons/TranslationContext';

const TagsInput = ({addField, resource, ...rest}) => {

    const messages = useMessages();

    return <ArrayInput
        {...rest}
        label=""
    >
        <SimpleFormIterator>
            <SelectInput
                source="name"
                label={`resources.tags.fields.name`}
                choices={Object.keys(messages.resources[resource].tags).map(tag => ({
                    id: tag,
                    name: `resources.${resource}.tags.${tag}`
                }))}
            />
            <DateTimeInput
                source="start"
                label={`resources.tags.fields.start`}
            />
            <DateTimeInput
                source="end"
                label={`resources.tags.fields.end`}
            />
        </SimpleFormIterator>
    </ArrayInput>;
};

TagsInput.defaultProps = {
    addField: true,
    source: 'tags',
};

export default TagsInput;
