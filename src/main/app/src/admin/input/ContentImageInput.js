import compose from 'recompose/compose';
import {withStyles} from '@material-ui/core/styles';
import {addField, translate} from 'react-admin';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {ContentFileInput} from './ContentFileInput';
import {addImageToContent} from '../actions';

const styles = {
    root: {width: '100%'},
    dropZone: {
        background: '#efefef',
        cursor: 'pointer',
        padding: '1rem',
        textAlign: 'center',
        color: '#999',
    },
    preview: {},
    buttons: {
        display: 'inline-block',
        position: 'relative',
        float: 'left',
        '& .add': {
            position: 'absolute',
            top: '0.5rem',
            right: '2.5rem',
            minWidth: '2rem',
            opacity: 0,
        },
        '& .remove': {
            position: 'absolute',
            top: '0.5rem',
            right: '0.5rem',
            minWidth: '2rem',
            opacity: 0,
        },
        '&:hover button': {
            opacity: 1,
        },
    },
};

export class ContentImageInput extends ContentFileInput {
    static defaultProps = {
        ...ContentFileInput.defaultProps,
        labelMultiple: 'ra.input.image.upload_several',
        labelSingle: 'ra.input.image.upload_single',
    };
}

export default compose(
    withRouter,
    addField,
    translate,
    withStyles(styles),
    connect(
        undefined,
        {addImageToContent}
    )
)(ContentImageInput);
