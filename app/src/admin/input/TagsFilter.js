import React from 'react';
import {SelectArrayInput} from 'react-admin';

import {withSanitizedTranslation} from '../../commons/TranslationContext';

const TagsFilter = ({addField, messages, resource, ...rest}) =>
    <SelectArrayInput
        {...rest}
        choices={Object.keys(messages.resources[resource].tags).map(tag => ({
            id: tag,
            name: `resources.${resource}.tags.${tag}`
        }))}
        label={`resources.${resource}.fields.tags`}
    />
;

const TranslatedTagsFilter = withSanitizedTranslation(TagsFilter);

TranslatedTagsFilter.defaultProps = {
    addField: true,
    source: 'tags',
};

export default TranslatedTagsFilter;