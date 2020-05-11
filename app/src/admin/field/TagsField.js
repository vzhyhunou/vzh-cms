import React from 'react';
import Chip from '@material-ui/core/Chip';
import {makeStyles} from '@material-ui/core';

import {useTranslate} from '../../commons/TranslationContext';

const useStyles = makeStyles({
    main: {
        display: 'flex',
        flexWrap: 'wrap'
    },
    chip: {
        margin: 4
    }
});

const TagsField = ({record, resource}) => {

    const translate = useTranslate();
    const classes = useStyles();

    return <span className={classes.main}>
        {record.tags && record.tags.map(tag => {

            const {name} = tag;

            return <Chip
                key={name}
                className={classes.chip}
                label={translate(`resources.${resource}.tags.${name}`)}
            />;
        })}
    </span>;
};

TagsField.defaultProps = {
    addLabel: true,
    source: 'tags',
};

export default TagsField;
