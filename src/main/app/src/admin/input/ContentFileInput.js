import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {shallowEqual} from 'recompose';
import Dropzone from 'react-dropzone';
import classnames from 'classnames';
import {Labeled} from 'react-admin';

import ContentFileInputPreview from './ContentFileInputPreview';
import sanitizeRestProps from './sanitizeRestProps';
import {name} from '../upload';

export class ContentFileInput extends Component {
    static propTypes = {
        accept: PropTypes.string,
        children: PropTypes.element,
        classes: PropTypes.object,
        className: PropTypes.string,
        disableClick: PropTypes.bool,
        input: PropTypes.object,
        isRequired: PropTypes.bool,
        label: PropTypes.string,
        labelMultiple: PropTypes.string,
        labelSingle: PropTypes.string,
        maxSize: PropTypes.number,
        minSize: PropTypes.number,
        multiple: PropTypes.bool,
        options: PropTypes.object,
        resource: PropTypes.string,
        source: PropTypes.string,
        translate: PropTypes.func.isRequired,
        placeholder: PropTypes.node,
        addImageToContent: PropTypes.func.isRequired
    };

    static defaultProps = {
        labelMultiple: 'ra.input.file.upload_several',
        labelSingle: 'ra.input.file.upload_single',
        multiple: false,
        onUpload: () => {
        },
    };

    constructor(props) {
        super(props);
        let files = props.input.value || [];
        if (!Array.isArray(files)) {
            files = [files];
        }

        this.state = {
            files: files.map(this.transformFile),
        };
    }

    componentWillReceiveProps(nextProps) {
        let files = nextProps.input.value || [];
        if (!Array.isArray(files)) {
            files = [files];
        }

        this.setState({files: files.map(this.transformFile)});
    }

    onDrop = files => {
        const updatedFiles = this.props.multiple
            ? [...this.state.files, ...files.map(this.transformFile)]
            : [...files.map(this.transformFile)];

        this.setState({files: updatedFiles});

        if (this.props.multiple) {
            this.props.input.onChange(updatedFiles);
        } else {
            this.props.input.onChange(updatedFiles[0]);
        }
    };

    onAdd = file => () => {
        const {addImageToContent} = this.props;

        addImageToContent(`<img src="/static/files/${name(file.rawFile)}"/>`)
    };

    onRemove = file => () => {
        const filteredFiles = this.state.files.filter(
            stateFile => !shallowEqual(stateFile, file)
        );

        this.setState({files: filteredFiles});

        if (this.props.multiple) {
            this.props.input.onChange(filteredFiles);
        } else {
            this.props.input.onChange(null);
        }
    };

    // turn a browser dropped file structure into expected structure
    transformFile = file => {
        if (!(file instanceof File)) {
            return file;
        }

        const {source, title} = React.Children.toArray(
            this.props.children
        )[0].props;

        const transformedFile = {
            rawFile: file,
            [source]: file.preview,
        };

        if (title) {
            transformedFile[title] = file.name;
        }

        return transformedFile;
    };

    label() {
        const {
            translate,
            placeholder,
            labelMultiple,
            labelSingle,
        } = this.props;

        if (placeholder) {
            return placeholder;
        }

        if (this.props.multiple) {
            return <p>{translate(labelMultiple)}</p>;
        }

        return <p>{translate(labelSingle)}</p>;
    }

    render() {
        const {
            accept,
            children,
            classes = {},
            className,
            disableClick,
            isRequired,
            label,
            maxSize,
            minSize,
            multiple,
            resource,
            source,
            options,
            ...rest
        } = this.props;

        return (
            <Labeled
                label={label}
                className={classnames(classes.root, className)}
                source={source}
                resource={resource}
                isRequired={isRequired}
                {...sanitizeRestProps(rest)}
            >
                <span>
                    <Dropzone
                        onDrop={this.onDrop}
                        accept={accept}
                        disableClick={disableClick}
                        maxSize={maxSize}
                        minSize={minSize}
                        multiple={multiple}
                        className={classes.dropZone}
                        {...options}
                    >
                        {this.label()}
                    </Dropzone>
                    {children && (
                        <div className="previews">
                            {this.state.files.map((file, index) => (
                                <ContentFileInputPreview
                                    key={index}
                                    file={file}
                                    onAdd={this.onAdd(file)}
                                    onRemove={this.onRemove(file)}
                                    className={classes.buttons}
                                >
                                    {React.cloneElement(children, {
                                        record: file,
                                        className: classes.preview,
                                    })}
                                </ContentFileInputPreview>
                            ))}
                        </div>
                    )}
                </span>
            </Labeled>
        );
    }
}
