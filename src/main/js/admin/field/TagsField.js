import React from 'react';
import Chip from '@material-ui/core/Chip';
import { translate } from 'react-admin';

const styles = {
    main: { display: 'flex', flexWrap: 'wrap' },
    chip: { margin: 4 },
};

const TagsField = ({ record, translate }) => (
    <span style={styles.main}>
        {record.tags &&
            record.tags.map(tag => (
                <Chip
                    key={tag}
                    style={styles.chip}
                    label={translate(`resources.pages.tags.${tag}`)}
                />
            ))}
    </span>
);

const TranslatedTagsField = translate(TagsField);

TranslatedTagsField.defaultProps = {
    addLabel: true,
    source: 'tags',
};

export default TranslatedTagsField;
