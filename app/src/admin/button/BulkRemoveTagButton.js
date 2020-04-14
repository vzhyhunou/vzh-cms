import React from 'react';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

import BulkTagButton from './BulkTagButton';

export default props =>
    <BulkTagButton
        {...props}
        label="resources.tags.actions.remove"
        data={(selected, tag) => selected.map(r => r.tags ? ({
            ...r,
            tags: r.tags.filter(t => t.name !== tag)
        }) : r)}
    >
        <RemoveCircleIcon/>
    </BulkTagButton>
;
