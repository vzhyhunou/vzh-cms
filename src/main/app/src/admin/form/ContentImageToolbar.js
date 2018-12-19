import React, {Component} from 'react';
import {ImageField, SaveButton, Toolbar} from 'react-admin';
import {withStyles} from '@material-ui/core/styles';

import ContentImageInput from '../input/ContentImageInput';

const styles = {
    bar: {
        display: 'inherit'
    }
};

const PATTERN = /<img.*?src=\\"(.*?)\\"/g;

class ContentImageToolbar extends Component {

    constructor(props) {
        super(props);
        const {record} = props;
        const data = JSON.stringify(record);
        let result;
        let set = new Set();
        while ((result = PATTERN.exec(data)) !== null) {
            set.add(result[1]);
        }
        set.forEach(f => record.files.push({src: f, title: f}));
    }

    render() {

        const {classes, ...rest} = this.props;

        return <Toolbar {...rest} className={classes.bar}>
            <ContentImageInput
                multiple
                source="files"
                accept="image/*"
                resource={rest.resource}
            >
                <ImageField source="src" title="title"/>
            </ContentImageInput>
            <SaveButton/>
        </Toolbar>;
    }
}

export default withStyles(styles)(ContentImageToolbar);
