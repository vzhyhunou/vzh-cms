import React from 'react';
import get from 'lodash/get';
import {Link} from 'react-router-dom';

export default ({source, record, resource}) =>
    <Link to={`/cms/${resource}/${get(record, 'id')}`}>{get(record, source)}</Link>
;
