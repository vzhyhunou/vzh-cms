import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import AddCircle from '@mui/icons-material/AddCircle';
import RemoveCircle from '@mui/icons-material/RemoveCircle';
import IconButton from '@mui/material/IconButton';
import { useTranslate } from 'react-admin';

export const FileInputPreview = (props) => {
    const {
        children,
        className,
        onAdd,
        onRemove,
        file,
        addIcon: AddIcon = AddCircle,
        removeIcon: RemoveIcon = RemoveCircle,
        ...rest
    } = props;

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
                size="small"
            >
                <AddIcon className={FileInputPreviewClasses.addIcon} />
            </IconButton>
            <IconButton
                className={FileInputPreviewClasses.removeButton}
                onClick={onRemove}
                aria-label={translate('ra.action.delete')}
                title={translate('ra.action.delete')}
                size="small"
            >
                <RemoveIcon className={FileInputPreviewClasses.removeIcon} />
            </IconButton>
            {children}
        </Root>
    );
};

const PREFIX = 'RaFileInputPreview';

export const FileInputPreviewClasses = {
    addButton: `${PREFIX}-addButton`,
    removeButton: `${PREFIX}-removeButton`,
    addIcon: `${PREFIX}-addIcon`,
    removeIcon: `${PREFIX}-removeIcon`,
};

const Root = styled('div', {
    name: PREFIX,
    overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
    [`& .${FileInputPreviewClasses.addButton}`]: {},
    [`& .${FileInputPreviewClasses.removeButton}`]: {},

    [`& .${FileInputPreviewClasses.addIcon}`]: {
        color: theme.palette.primary.main,
    },
    [`& .${FileInputPreviewClasses.removeIcon}`]: {
        color: theme.palette.error.main,
    },
}));
