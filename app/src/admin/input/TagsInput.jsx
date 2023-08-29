import React from 'react';
import {
    ArrayInput,
    DateTimeInput,
    SelectInput,
    SimpleFormIterator,
    required,
    useResourceContext
} from 'react-admin';

import useMessages from '../../commons/i18n/useMessages';

export default () => {

    const resource = useResourceContext();
    const messages = useMessages();

    return messages && <ArrayInput
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
                choices={Object.entries(messages.resources[resource].tags).map(([key, value]) => ({
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
