import React from 'react';
import { Route } from 'react-router-dom';

import Pages from './pages/App';

export default [
    <Route path="/pages/:id" component={Pages}/>
];
