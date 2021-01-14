import React from 'react';
import {BulkDeleteButton} from 'react-admin';

import BulkAddTagButton from './BulkAddTagButton';
import BulkRemoveTagButton from './BulkRemoveTagButton';

export default props =>
    <>
        <BulkAddTagButton {...props} />
        <BulkRemoveTagButton {...props} />
        <BulkDeleteButton {...props} />
    </>
;
