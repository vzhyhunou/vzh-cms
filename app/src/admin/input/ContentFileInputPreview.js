import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import IconButton from '@material-ui/core/IconButton';
import { useTranslate } from 'react-admin';

const useStyles = makeStyles(
    theme => ({
        button: {},
        icon: {
            color: theme.palette.error.main,
        },
    })
);

const ContentFileInputPreview = props => {
    const {
        children,
        classes: classesOverride,
        className,
        onAdd,
        onRemove,
        file,
        ...rest
    } = props;
    const classes = useStyles(props);
    const translate = useTranslate();

    useEffect(() => {
        return () => {
            const preview = file.rawFile ? file.rawFile.preview : file.preview;

            if (preview) {
                window.URL.revokeObjectURL(preview);
            }
        };
    }, [file]);

    return (
        <div className={className} {...rest}>
            <IconButton
                className="add"
                onClick={onAdd}
                aria-label={translate('ra.action.add')}
                title={translate('ra.action.add')}
            >
                <AddCircle className={classes.icon} />
            </IconButton>
            <IconButton
                className="remove"
                onClick={onRemove}
                aria-label={translate('ra.action.delete')}
                title={translate('ra.action.delete')}
            >
                <RemoveCircle className={classes.icon} />
            </IconButton>
            {children}
        </div>
    );
};

ContentFileInputPreview.defaultProps = {
    file: undefined,
};

export default ContentFileInputPreview;
