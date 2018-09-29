import React from 'react';
import {SelectArrayInput, translate} from 'react-admin';

const TagsInput = ({translate, addField, tags, resource, ...rest}) => (
    <SelectArrayInput
        {...rest}
        choices={tags.map(tag => ({
            id: tag,
            name: translate(`resources.${resource}.tags.${tag}`),
        }))}
    />
);

const TranslatedTagsInput = translate(TagsInput);

TranslatedTagsInput.defaultProps = {
    addField: true,
    source: 'tags',
};

export default TranslatedTagsInput;
