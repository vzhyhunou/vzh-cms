import React from 'react';
import {Routes, Route} from 'react-router-dom';

import {Page} from '../pages';

export default () =>
    <Routes>
        <Route path="/pages/:id" element={<Page/>}/>
    </Routes>
;
