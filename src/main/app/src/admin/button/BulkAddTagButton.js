import React from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import BulkTagButton from './BulkTagButton';

export default props =>
    <BulkTagButton
        {...props}
        label="resources.tags.actions.add"
        data={(selected, tag) => selected.map(r => ({
            ...r,
            tags: r.tags ? [...r.tags, {name: tag}] : [{name: tag}]
        }))}
    >
        <AddCircleIcon/>
    </BulkTagButton>
;
