import React from 'react';
import {SelectArrayInput} from 'react-admin';

import {withSanitizedTranslation} from '../../commons/TranslationContext';

const TagsInput = ({translate, addField, messages, resource, ...rest}) => (
    <SelectArrayInput
        {...rest}
        choices={Object.keys(messages.resources[resource].tags).map(tag => ({
            id: tag,
            name: translate(`resources.${resource}.tags.${tag}`),
        }))}
        label={`resources.${resource}.fields.tags`}
    />
);

const TranslatedTagsInput = withSanitizedTranslation(TagsInput);

TranslatedTagsInput.defaultProps = {
    addField: true,
    source: 'tags',
};

export default TranslatedTagsInput;
