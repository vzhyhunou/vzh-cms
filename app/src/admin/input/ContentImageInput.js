import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ContentFileInput from './ContentFileInput';

const useStyles = makeStyles(
    theme => ({
        root: { width: '100%' },
        dropZone: {
            background: theme.palette.background.default,
            cursor: 'pointer',
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.getContrastText(
                theme.palette.background.default
            ),
        },
        preview: {
            display: 'inline-block',
        },
        button: {
            display: 'inline-block',
            position: 'relative',
            float: 'left',
            '& .add': {
                position: 'absolute',
                top: theme.spacing(1),
                right: theme.spacing(6),
                minWidth: theme.spacing(2),
                opacity: 0,
            },
            '& .remove': {
                position: 'absolute',
                top: theme.spacing(1),
                right: theme.spacing(1),
                minWidth: theme.spacing(2),
                opacity: 0,
            },
            '&:hover button': {
                opacity: 1,
            },
        },
    })
);

const ContentImageInput = props => {
    const classes = useStyles(props);

    return (
        <ContentFileInput
            labelMultiple="ra.input.image.upload_several"
            labelSingle="ra.input.image.upload_single"
            classes={classes}
            {...props}
        />
    );
};

export default ContentImageInput;
