import React from 'react';
import {ArrayInput, DateTimeInput, SelectInput, SimpleFormIterator} from 'react-admin';

import {withSanitizedTranslation} from '../../commons/TranslationContext';

const TagsInput = ({addField, messages, resource, ...rest}) =>
    <ArrayInput
        {...rest}
        label={null}
    >
        <SimpleFormIterator>
            <SelectInput
                source="name"
                label={`resources.${resource}.fields.tags.name`}
                choices={Object.keys(messages.resources[resource].tags).map(tag => ({
                    id: tag,
                    name: `resources.${resource}.tags.${tag}`
                }))}
            />
            <DateTimeInput
                source="start"
                label={`resources.${resource}.fields.tags.start`}
            />
            <DateTimeInput
                source="end"
                label={`resources.${resource}.fields.tags.end`}
            />
        </SimpleFormIterator>
    </ArrayInput>
;

const TranslatedTagsInput = withSanitizedTranslation(TagsInput);

TranslatedTagsInput.defaultProps = {
    addField: true,
    source: 'tags',
};

export default TranslatedTagsInput;
