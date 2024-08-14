import React from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import BulkTagButton from './BulkTagButton';

export default () =>
    <BulkTagButton
        label="resources.tags.actions.remove"
        getData={(record, name) => ({
            id: record.id,
            tags: record.tags ? record.tags.filter(t => t.name !== name) : []
        })}
    >
        <RemoveCircleIcon/>
    </BulkTagButton>
;
