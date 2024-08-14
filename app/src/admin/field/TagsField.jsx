import React from 'react';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import {useTranslate, useRecordContext, useResourceContext} from 'react-admin';

export default () => {

    const translate = useTranslate();
    const record = useRecordContext();
    const resource = useResourceContext();

    if (!record || !record.tags) {
        return null;
    }

    return <Stack direction="row" gap={1} flexWrap="wrap">
        {record.tags.map(({name}) =>
            <Chip
                size="small"
                key={name}
                label={translate(`resources.${resource}.tags.${name}`)}
            />
        )}
    </Stack>;
};
