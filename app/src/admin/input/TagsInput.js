import React from 'react';
import {
    ArrayInput,
    DateTimeInput,
    SelectInput,
    SimpleFormIterator,
    required,
    useResourceContext
} from 'react-admin';

import {useGetMessages} from '../../commons';

export default () => {

    const getMessages = useGetMessages();
    const resource = useResourceContext();
    const {tags} = getMessages().resources[resource];

    return <ArrayInput
        source="tags"
        label=""
    >
        <SimpleFormIterator
            inline
            getItemLabel={() => ''}
        >
            <SelectInput
                source="name"
                label={`resources.tags.fields.name`}
                choices={Object.entries(tags).map(([key, value]) => ({
                    id: key,
                    name: value
                }))}
                validate={[required()]}
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
