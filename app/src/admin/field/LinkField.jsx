import React from 'react';
import get from 'lodash/get';
import {Link, useRecordContext, useResourceContext} from 'react-admin';

export default ({source}) => {

    const record = useRecordContext();
    const resource = useResourceContext();

    return <Link to={`/cms/${resource}/${get(record, 'id')}`}>{get(record, source)}</Link>
};
