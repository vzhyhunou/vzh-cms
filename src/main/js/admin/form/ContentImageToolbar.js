import React from 'react';
import {ImageField, SaveButton, Toolbar} from 'react-admin';
import {withStyles} from '@material-ui/core/styles';

import ContentImageInput from '../input/ContentImageInput';

const styles = {
    bar: {
        display: 'inherit'
    }
};

const ContentImageToolbar = ({classes, resource, ...rest}) =>
    <Toolbar {...rest} className={classes.bar}>
        <ContentImageInput
            multiple
            source="files"
            accept="image/*"
            resource={resource}
        >
            <ImageField source="src" title="title"/>
        </ContentImageInput>
        <SaveButton/>
    </Toolbar>
;

export default withStyles(styles)(ContentImageToolbar);
