import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import BulkTagButton from './BulkTagButton';

export default () =>
    <BulkTagButton
        label="resources.tags.actions.add"
        getData={(record, tag) => ({
            id: record.id,
            tags: record.tags ? [...record.tags, {name: tag}] : [{name: tag}]
        })}
    >
        <AddCircleIcon/>
    </BulkTagButton>
;
