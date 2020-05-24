import React from 'react';
import {ArrayInput, DateTimeInput, SelectInput, SimpleFormIterator} from 'react-admin';
import {makeStyles} from '@material-ui/core/styles';

import {useMessages} from '../../commons/TranslationContext';

const useStyles = makeStyles({
    form: {
        display: 'flex'
    }
});

const useControlStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing(1)
    }
}));

const TagsInput = ({addField, resource, ...rest}) => {

    const messages = useMessages();
    const classes = useStyles();
    const controlClasses = useControlStyles();

    return <ArrayInput
        {...rest}
        label=""
    >
        <SimpleFormIterator classes={classes}>
            <SelectInput
                source="name"
                label={`resources.tags.fields.name`}
                choices={Object.keys(messages.resources[resource].tags).map(tag => ({
                    id: tag,
                    name: `resources.${resource}.tags.${tag}`
                }))}
            />
            <DateTimeInput
                className={controlClasses.root}
                source="start"
                label={`resources.tags.fields.start`}
            />
            <DateTimeInput
                className={controlClasses.root}
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
