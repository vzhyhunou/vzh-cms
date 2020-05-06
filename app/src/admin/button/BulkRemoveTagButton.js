import React from 'react';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

import BulkTagButton from './BulkTagButton';

export default props =>
    <BulkTagButton
        {...props}
        label="resources.tags.actions.remove"
        data={(record, tag) => ({
            id: record.id,
            tags: record.tags ? record.tags.filter(t => t.name !== tag) : []
        })}
    >
        <RemoveCircleIcon/>
    </BulkTagButton>
;
