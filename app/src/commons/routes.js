import React from 'react';
import { Route } from 'react-router-dom';

import Page from '../pages/App';

export default [
    <Route path="/pages/:id" component={Page}/>
];
