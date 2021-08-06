import React from 'react';
import {
    ArrayInput,
    DateTimeInput,
    SelectInput,
    SimpleFormIterator,
    required
} from 'react-admin';
import {makeStyles} from '@material-ui/core/styles';

import {useGetMessages} from '../../commons/AppContext';

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

    const getMessages = useGetMessages();
    const classes = useStyles();
    const controlClasses = useControlStyles();
    const {tags} = getMessages().resources[resource];

    return <ArrayInput
        {...rest}
        label=""
    >
        <SimpleFormIterator classes={classes}>
            <SelectInput
                source="name"
                label={`resources.tags.fields.name`}
                choices={Object.keys(tags).map(tag => ({
                    id: tag,
                    name: tags[tag]
                }))}
                validate={[required()]}
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
