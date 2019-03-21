import React from 'react';
import {connect} from 'react-redux';
import {SelectArrayInput, translate} from 'react-admin';
import compose from 'recompose/compose';

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

const TranslatedTagsInput = compose(
    connect(
        state => ({
            messages: state.i18n.messages
        }),
        {}
    ),
    translate
)(TagsInput);

TranslatedTagsInput.defaultProps = {
    addField: true,
    source: 'tags',
};

export default TranslatedTagsInput;
