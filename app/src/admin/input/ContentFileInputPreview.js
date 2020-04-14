import React, {Component} from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';

const styles = theme => ({
    icon: {
        color: theme.palette.accent1Color,
    },
});

export class ContentFileInputPreview extends Component {

    componentWillUnmount() {
        const {file, revokeObjectURL} = this.props;

        if (file.preview) {
            revokeObjectURL
                ? revokeObjectURL(file.preview)
                : window.URL.revokeObjectURL(file.preview);
        }
    }

    render() {
        const {
            children,
            classes = {},
            className,
            onAdd,
            onRemove,
            ...rest
        } = this.props;

        return (
            <div className={className} {...rest}>
                <IconButton className="add" onClick={onAdd}>
                    <AddCircle className={classes.icon}/>
                </IconButton>
                <IconButton className="remove" onClick={onRemove}>
                    <RemoveCircle className={classes.icon}/>
                </IconButton>
                {children}
            </div>
        );
    }
}

ContentFileInputPreview.propTypes = {
    children: PropTypes.element.isRequired,
    classes: PropTypes.object,
    className: PropTypes.string,
    file: PropTypes.object,
    onAdd: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    revokeObjectURL: PropTypes.func,
};

ContentFileInputPreview.defaultProps = {
    file: undefined,
};

export default withStyles(styles)(ContentFileInputPreview);
