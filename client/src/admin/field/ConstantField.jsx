import React from 'react';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { useTranslate, useRecordContext, useResourceContext } from 'react-admin';

export default ({source, property}) => {

    const translate = useTranslate();
    const record = useRecordContext();
    const resource = useResourceContext();

    if (!record || !record[source]) {
        return null;
    }

    const Field = ({value}) =>
        <Chip
            size="small"
            label={translate(`resources.${resource}.${source}.${property ? value[property] : value}`)}
        />
    ;

    return <Stack direction="row" gap={1} flexWrap="wrap">
        {Array.isArray(record[source]) ? record[source].map((value, i) => <Field key={i} {...{value}}/>) : <Field value={record[source]}/>}
    </Stack>;
};