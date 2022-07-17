import React, {
    Children,
    cloneElement,
    isValidElement
} from 'react';
import { styled } from '@mui/material/styles';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
import FormHelperText from '@mui/material/FormHelperText';
import {
    useInput,
    useTranslate,
    shallowEqual,
    Labeled,
    sanitizeInputRestProps,
    InputHelperText
} from 'react-admin';

import { FileInputPreview } from './ContentFileInputPreview';

export const FileInput = props => {
    const {
        accept,
        children,
        className,
        format,
        helperText,
        inputProps: inputPropsOptions,
        maxSize,
        minSize,
        multiple = false,
        label,
        labelMultiple = 'ra.input.file.upload_several',
        labelSingle = 'ra.input.file.upload_single',
        options = {},
        onAdd: onAddProp,
        onRemove: onRemoveProp,
        parse,
        placeholder,
        resource,
        source,
        validate,
        validateFileRemoval,
        ...rest
    } = props;
    const { onDrop: onDropProp } = options;
    const translate = useTranslate();

    // turn a browser dropped file structure into expected structure
    const transformFile = file => {
        if (!(file instanceof File)) {
            return file;
        }

        const { source, title } = Children.only(children).props;

        const preview = URL.createObjectURL(file);
        const transformedFile = {
            rawFile: file,
            [source]: preview,
        };

        if (title) {
            transformedFile[title] = file.name;
        }

        return transformedFile;
    };

    const transformFiles = files => {
        if (!files) {
            return multiple ? [] : null;
        }

        if (Array.isArray(files)) {
            return files.map(transformFile);
        }

        return transformFile(files);
    };

    const {
        id,
        field: { onChange, value },
        fieldState,
        formState: { isSubmitted },
        isRequired,
    } = useInput({
        format: format || transformFiles,
        parse: parse || transformFiles,
        source,
        validate,
        ...rest,
    });
    const { isTouched, error } = fieldState;
    const files = value ? (Array.isArray(value) ? value : [value]) : [];

    const onDrop = (newFiles, rejectedFiles, event) => {
        const updatedFiles = multiple ? [...files, ...newFiles] : [...newFiles];

        if (multiple) {
            onChange(updatedFiles);
        } else {
            onChange(updatedFiles[0]);
        }

        if (onDropProp) {
            onDropProp(newFiles, rejectedFiles, event);
        }
    };

    const onAdd = file => () => {
        if (onAddProp) {
            onAddProp(file);
        }
    };

    const onRemove = file => async () => {
        if (validateFileRemoval) {
            try {
                await validateFileRemoval(file);
            } catch (e) {
                return;
            }
        }
        if (multiple) {
            const filteredFiles = files.filter(
                stateFile => !shallowEqual(stateFile, file)
            );
            onChange(filteredFiles);
        } else {
            onChange(null);
        }

        if (onRemoveProp) {
            onRemoveProp(file);
        }
    };

    const childrenElement =
        children && isValidElement(Children.only(children))
            ? Children.only(children)
            : undefined;

    const { getRootProps, getInputProps } = useDropzone({
        accept,
        maxSize,
        minSize,
        multiple,
        ...options,
        onDrop,
    });

    return (
        <StyledLabeled
            htmlFor={id}
            label={label}
            className={clsx('ra-input', `ra-input-${source}`, className)}
            source={source}
            resource={resource}
            isRequired={isRequired}
            {...sanitizeInputRestProps(rest)}
        >
            <>
                <div
                    {...getRootProps({
                        className: FileInputClasses.dropZone,
                        'data-testid': 'dropzone',
                    })}
                >
                    <input
                        id={id}
                        name={id}
                        {...getInputProps({
                            ...inputPropsOptions,
                        })}
                    />
                    {placeholder ? (
                        placeholder
                    ) : multiple ? (
                        <p>{translate(labelMultiple)}</p>
                    ) : (
                        <p>{translate(labelSingle)}</p>
                    )}
                </div>
                <FormHelperText>
                    <InputHelperText
                        touched={isTouched || isSubmitted}
                        error={error && error.message}
                        helperText={helperText}
                    />
                </FormHelperText>
                {children && (
                    <div className="previews">
                        {files.map((file, index) => (
                            <FileInputPreview
                                key={index}
                                file={file}
                                onAdd={onAdd(file)}
                                onRemove={onRemove(file)}
                                className={FileInputClasses.button}
                            >
                                {cloneElement(childrenElement, {
                                    record: file,
                                    className: FileInputClasses.preview,
                                })}
                            </FileInputPreview>
                        ))}
                    </div>
                )}
            </>
        </StyledLabeled>
    );
};

const PREFIX = 'RaContentFileInput';

export const FileInputClasses = {
    dropZone: `${PREFIX}-dropZone`,
    preview: `${PREFIX}-preview`,
    button: `${PREFIX}-button`,
};

const StyledLabeled = styled(Labeled, {
    name: PREFIX,
    overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
    width: '100%',
    [`& .${FileInputClasses.dropZone}`]: {
        background: theme.palette.background.default,
        borderRadius: theme.shape.borderRadius,
        fontFamily: theme.typography.fontFamily,
        cursor: 'pointer',
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.getContrastText(theme.palette.background.default),
    },
    [`& .${FileInputClasses.preview}`]: {},
    [`& .${FileInputClasses.button}`]: {},
}));
