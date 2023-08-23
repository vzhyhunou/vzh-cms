import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import AddCircle from '@mui/icons-material/AddCircle';
import RemoveCircle from '@mui/icons-material/RemoveCircle';
import IconButton from '@mui/material/IconButton';
import { useTranslate } from 'react-admin';

export const FileInputPreview = props => {
    const { children, className, onAdd, onRemove, file, ...rest } = props;

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
        <Root className={className} {...rest}>
            <IconButton
                className={FileInputPreviewClasses.addButton}
                onClick={onAdd}
                aria-label={translate('ra.action.add')}
                title={translate('ra.action.add')}
                size="large"
            >
                <AddCircle className={FileInputPreviewClasses.addIcon} />
            </IconButton>
            <IconButton
                className={FileInputPreviewClasses.removeButton}
                onClick={onRemove}
                aria-label={translate('ra.action.delete')}
                title={translate('ra.action.delete')}
                size="large"
            >
                <RemoveCircle className={FileInputPreviewClasses.removeIcon} />
            </IconButton>
            {children}
        </Root>
    );
};

FileInputPreview.defaultProps = {
    file: undefined,
};

const PREFIX = 'RaContentFileInputPreview';

export const FileInputPreviewClasses = {
    addButton: `${PREFIX}-addButton`,
    addIcon: `${PREFIX}-addIcon`,
    removeButton: `${PREFIX}-removeButton`,
    removeIcon: `${PREFIX}-removeIcon`,
};

const Root = styled('div', {
    name: PREFIX,
    overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
    [`& .${FileInputPreviewClasses.addButton}`]: {},

    [`& .${FileInputPreviewClasses.addIcon}`]: {
        color: theme.palette.error.main,
    },

    [`& .${FileInputPreviewClasses.removeButton}`]: {},

    [`& .${FileInputPreviewClasses.removeIcon}`]: {
        color: theme.palette.error.main,
    },
}));
