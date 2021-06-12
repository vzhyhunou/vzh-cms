import React from 'react';
import get from 'lodash/get';
import {Link} from 'react-router-dom';

export default ({source, name = source, record, resource}) =>
    <Link to={`/cms/${resource}/${get(record, source)}`}>{get(record, name)}</Link>
;
