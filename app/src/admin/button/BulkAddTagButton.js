import React from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import BulkTagButton from './BulkTagButton';

export default props =>
    <BulkTagButton
        {...props}
        label="resources.tags.actions.add"
        data={(record, tag) => ({
            id: record.id,
            tags: record.tags ? [...record.tags, {name: tag}] : [{name: tag}]
        })}
    >
        <AddCircleIcon/>
    </BulkTagButton>
;
