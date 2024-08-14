import React from 'react';
import { useRecordContext, useResourceContext } from 'react-admin';
import { Link } from 'react-router-dom';

export default ({source}) => {

    const record = useRecordContext();
    const resource = useResourceContext();

    return <Link to={`/cms/${resource}/${record.id}`}>{record[source]}</Link>;
};
