import React, {
    Children,
    cloneElement,
    isValidElement
} from 'react';
import { shallowEqual } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import classnames from 'classnames';
import {
    useInput,
    useTranslate,
    Labeled,
    InputHelperText,
    useTranslatableContext,
    sanitizeInputRestProps
} from 'react-admin';
import { useForm, useFormState } from 'react-final-form';

import ContentFileInputPreview from './ContentFileInputPreview';

const useStyles = makeStyles(
    theme => ({
        dropZone: {
            background: theme.palette.background.default,
            cursor: 'pointer',
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.getContrastText(
                theme.palette.background.default
            ),
        },
        preview: {},
        button: {},
        root: { width: '100%' },
    })
);

const ContentFileInput = props => {
    const {
        accept,
        children,
        className,
        classes: classesOverride,
        format,
        helperText,
        label,
        labelMultiple = 'ra.input.file.upload_several',
        labelSingle = 'ra.input.file.upload_single',
        maxSize,
        minSize,
        multiple = false,
        options: {
            inputProps: inputPropsOptions,
            ...options
        } = {},
        parse,
        placeholder,
        resource,
        source,
        validate,
        ...rest
    } = props;
    const translate = useTranslate();
    const classes = useStyles(props);
    const form = useForm();
    const {values} = useFormState();
    const {content} = values;
    const {selectedLocale} = useTranslatableContext();

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
        input: { onChange, value, ...inputProps },
        meta,
        isRequired,
    } = useInput({
        format: format || transformFiles,
        parse: parse || transformFiles,
        source,
        type: 'file',
        validate,
        ...rest,
    });
    const { touched, error, submitError } = meta;
    const files = value ? (Array.isArray(value) ? value : [value]) : [];

    const onDrop = (newFiles, rejectedFiles, event) => {
        const updatedFiles = multiple ? [...files, ...newFiles] : [...newFiles];

        if (multiple) {
            onChange(updatedFiles);
        } else {
            onChange(updatedFiles[0]);
        }

        if (options.onDrop) {
            options.onDrop(newFiles, rejectedFiles, event);
        }
    };

    const onAdd = file => () => {
        const { source } = Children.only(children).props;

        form.change(
            `content.${selectedLocale}`,
            content ? `${content[selectedLocale]}\n<img src="${file[source]}"/>` : `<img src="${file[source]}"/>`
        );
    };

    const onRemove = file => () => {
        if (multiple) {
            const filteredFiles = files.filter(
                stateFile => !shallowEqual(stateFile, file)
            );
            onChange(filteredFiles);
        } else {
            onChange(null);
        }

        if (options.onRemove) {
            options.onRemove(file);
        }
    };

    const childrenElement =
        children && isValidElement(Children.only(children))
            ? Children.only(children)
            : undefined;

    const { getRootProps, getInputProps } = useDropzone({
        ...options,
        accept,
        maxSize,
        minSize,
        multiple,
        onDrop,
    });

    return (
        <Labeled
            id={id}
            label={label}
            className={classnames(classes.root, className)}
            source={source}
            resource={resource}
            isRequired={isRequired}
            meta={meta}
            {...sanitizeInputRestProps(rest)}
        >
            <>
                <div
                    data-testid="dropzone"
                    className={classes.dropZone}
                    {...getRootProps()}
                >
                    <input
                        id={id}
                        {...getInputProps({
                            ...inputProps,
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
                        touched={touched}
                        error={error || submitError}
                        helperText={helperText}
                    />
                </FormHelperText>
                {children && (
                    <div className="previews">
                        {files.map((file, index) => (
                            <ContentFileInputPreview
                                key={index}
                                file={file}
                                onAdd={onAdd(file)}
                                onRemove={onRemove(file)}
                                className={classes.button}
                            >
                                {cloneElement(childrenElement, {
                                    record: file,
                                    className: classes.preview,
                                })}
                            </ContentFileInputPreview>
                        ))}
                    </div>
                )}
            </>
        </Labeled>
    );
};

export default ContentFileInput;
