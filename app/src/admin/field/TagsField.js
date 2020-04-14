import React from 'react';
import Chip from '@material-ui/core/Chip';

import {withTranslation} from '../../commons/TranslationContext';

const styles = {
    main: {display: 'flex', flexWrap: 'wrap'},
    chip: {margin: 4}
};

const TagsField = ({record, translate, resource}) =>
    <span style={styles.main}>
        {record.tags && record.tags.map(tag => {

            const {name} = tag;

            return <Chip
                key={name}
                style={styles.chip}
                label={translate(`resources.${resource}.tags.${name}`)}
            />;
        })}
    </span>
;

const TranslatedTagsField = withTranslation(TagsField);

TranslatedTagsField.defaultProps = {
    addLabel: true,
    source: 'tags',
};

export default TranslatedTagsField;
