import React from 'react';
import {BulkDeleteButton} from 'react-admin';

import BulkAddTagButton from './BulkAddTagButton';
import BulkRemoveTagButton from './BulkRemoveTagButton';

export default () =>
    <>
        <BulkAddTagButton/>
        <BulkRemoveTagButton/>
        <BulkDeleteButton/>
    </>
;
