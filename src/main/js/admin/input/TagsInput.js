import React from 'react';
import {SelectArrayInput, translate} from 'react-admin';

const TagsInput = ({translate, addField, tags, ...rest}) => (
    <SelectArrayInput
        {...rest}
        choices={tags.map(tag => ({
            id: tag,
            name: translate(`resources.pages.tags.${tag}`),
        }))}
    />
);

const TranslatedTagsInput = translate(TagsInput);

TranslatedTagsInput.defaultProps = {
    addField: true,
    source: 'tags',
};

export default TranslatedTagsInput;
