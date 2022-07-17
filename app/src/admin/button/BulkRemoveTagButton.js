import React from 'react';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import BulkTagButton from './BulkTagButton';

export default () =>
    <BulkTagButton
        label="resources.tags.actions.remove"
        getData={(record, tag) => ({
            id: record.id,
            tags: record.tags ? record.tags.filter(({name}) => name !== tag) : []
        })}
    >
        <RemoveCircleIcon/>
    </BulkTagButton>
;
