import React from 'react';
import {
    ArrayInput,
    DateTimeInput,
    SelectInput,
    SimpleFormIterator,
    required,
    useResourceContext,
    useTranslate
} from 'react-admin';

import {useContextProvider} from '../..';

export default () => {

    const translate = useTranslate();
    const resource = useResourceContext();
    const {tags} = useContextProvider();

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
                choices={Object.keys(tags[resource]).map(id => ({
                    id,
                    name: translate(`resources.${resource}.tags.${id}`)
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
